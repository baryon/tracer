"use strict";
var tinytim = require('tinytim'), dateFormat = require('dateformat'), utils = require('./utils'), path = require('path'), settings = require('./settings').settings;

var noop = function(){};

var fwrap = function(fn){
	return function(str){ return fn(str) };
};

// Stack trace format :
// https://github.com/v8/v8/wiki/Stack%20Trace%20API
var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;

// main log method
function logMain(config, level, title, format, filters, needstack, args) {
	//check level of global settings
	var gLevel = settings.level;
	if (typeof (gLevel) == 'string')
		gLevel = config.methods.indexOf(gLevel);
	if (level < gLevel) { return; }

	var data = {
		timestamp : dateFormat(new Date(), config.dateformat),
		message : "",
		title : title,
		level : level,
		args : args
	};
	data.method = data.path = data.line = data.pos = data.file = '';

	if (needstack) {
		// get call stack, and analyze it
		// get all file,method and line number
		var stacklist = (new Error()).stack.split('\n').slice(3);
		var s = stacklist[config.stackIndex] || stacklist[0],
			sp = stackReg.exec(s) || stackReg2.exec(s);
		if (sp && sp.length === 5) {
			data.method = sp[1];
			data.path = sp[2];
			data.line = sp[3];
			data.pos = sp[4];
			data.file = path.basename(data.path);
			data.stack = stacklist.join('\n');
		}
	}

	config.preprocess(data);
	var msg = utils.format.apply(config, data.args);
	data.message = msg;

	// call micro-template to ouput
	data.output = tinytim.tim(format, data);
	
	// save unprocessed output
	data.rawoutput = data.output;

	// process every filter method
	var len = filters.length;
	for ( var i = 0; i < len; i += 1) {
		data.output = fwrap(filters[i])(data.output);
		if (!data.output)
			return data;
		// cancel next process if return a false(include null, undefined)
	}
	// trans the final result
	config.transport.forEach(function(tras) {
		tras(data);
	});
	return data;
}

module.exports = (function() {
	// default config
	var _config = {
		format : "{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}",
		dateformat : "isoDateTime",
		preprocess : function() {
		},
		transport : function(data) {
			if (data.level >= 4) { // warn and more critical
				console.error(data.output);
			} else {
				console.log(data.output);
			}
		},
		filters : [],
		level : 'log',
		methods : [ 'log', 'trace', 'debug', 'info', 'warn', 'error', 'fatal' ],
		stackIndex : 0,		// get the specified index of stack as file information. It is userful for development package.
		inspectOpt : {
			showHidden : false, //if true then the object's non-enumerable properties will be shown too. Defaults to false
			depth : 2 //tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to 2. To make it recurse indefinitely pass null.
		}
	};

	var userConfig = arguments;
	if(typeof userConfig[0] === 'string') {
		userConfig = [require(userConfig[0])];
	}

	// union user's config and default
	_config = utils.union(_config, userConfig);

	var _self = {};

	_config.format = Array.isArray(_config.format) ? _config.format
		: [ _config.format ];

	_config.filters = Array.isArray(_config.filters) ? _config.filters
		: [ _config.filters ];

	_config.transport = Array.isArray(_config.transport) ? _config.transport : [_config.transport];

	var fLen = _config.filters.length, lastFilter;
	if (fLen > 0)
		if (Object.prototype.toString.call(_config.filters[--fLen]) != '[object Function]') {
			lastFilter = _config.filters[fLen];
			_config.filters = _config.filters.slice(0, fLen);
		}

	if (typeof (_config.level) == 'string')
		_config.level = _config.methods.indexOf(_config.level);

	_config.methods.forEach(function(title, i) {
		if (i < _config.level)
			_self[title] = noop;
		else {
			var format = _config.format[0];
			if (_config.format.length === 2 && _config.format[1][title])
				format = _config.format[1][title];
			var needstack = /{{(method|path|line|pos|file|stack)}}/i.test(format);

			var filters;
			if (lastFilter && lastFilter[title])
				filters = Array.isArray(lastFilter[title]) ? lastFilter[title]
					: [ lastFilter[title] ];
			else
				filters = _config.filters;

			// interface
			_self[title] = function() {
				return logMain(_config, i, title, format, filters, needstack, arguments);
			};
		}
	});

	return _self;
});
