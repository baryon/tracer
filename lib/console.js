var tinytim = require('tinytim'), dateFormat = require('dateformat'), utils = require('./utils')
module.exports = (function() {
	// default config
	var _config = {
		format : "{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}",
		dateformat : "UTC:yyyy-mm-dd'T'HH:MM:ss.l'Z'",
		preprocess : function(data) {
		},
		transport : function(data) {
			console.log(data.output);
		},
		filters : [],
		level : 'log',
		methods : [ 'log', 'trace', 'debug', 'info', 'warn', 'error' ]
	};

	// union user's config and default
	_config = utils.union(_config, arguments);

	// main log method
	var _log = function(level, title, format, filters, needstack, args) {
		var msg = utils.format.apply(this, args);
		var data = {
			timestamp : dateFormat(new Date(), _config.dateformat),
			message : msg,
			title : title,
			level : level,
			args : args
		};
		data.method = data.path = data.line = data.pos = data.file = '';

		if (needstack) {
			// get call stack, and analyze it
			// get all file,method and line number
			data.stack = (new Error()).stack.split('\n').slice(3);

			// Stack trace format :
			// http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
			var s = data.stack[0], sp = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
					.exec(s)
					|| /at\s+()(.*):(\d*):(\d*)/gi.exec(s);
			if (sp && sp.length === 5) {
				data.method = sp[1];
				data.path = sp[2];
				data.line = sp[3];
				data.pos = sp[4];
				var paths = data.path.split('/');
				data.file = paths[paths.length - 1];
			}
		}

		_config.preprocess(data);

		// call micro-template to ouput
		data.output = tinytim.tim(format, data);

		// process every filter method
		var len = filters.length;
		for ( var i = 0; i < len; i += 1) {
			data.output = filters[i](data.output, data);
			if (!data.output)
				return data;
			// cancel next process if return a false(include null, undefined)
		}
		// trans the final result
		return _config.transport(data);
	};

	var _self = {};

	_config.format = Array.isArray(_config.format) ? _config.format
			: [ _config.format ];

	_config.filters = Array.isArray(_config.filters) ? _config.filters
			: [ _config.filters ];

	var len = _config.methods.length, fLen = _config.filters.length, lastFilter;
	if (fLen > 0)
		if (Object.prototype.toString.call(_config.filters[fLen - 1]) != '[object Function]') {
			fLen -= 1;
			lastFilter = _config.filters[fLen];
			_config.filters = _config.filters.slice(0, fLen);
		}

	if (typeof (_config.level) == 'string')
		_config.level = _config.methods.indexOf(_config.level);

	for ( var i = 0; i < len; ++i) {
		var title = _config.methods[i];
		if (i < _config.level)
			_self[title] = (function() {
			});// empty function
		else {
			var format = _config.format[0];
			if (_config.format.length === 2 && _config.format[1][title])
				format = _config.format[1][title];
			var needstack = false;
			if (/{{(method|path|line|pos|file)}}/gi.test(format))
				needstack = true;

			var filters;
			if (lastFilter && lastFilter[title])
				filters = Array.isArray(lastFilter[title]) ? lastFilter[title]
						: [ lastFilter[title] ];
			else
				filters = _config.filters;

			_self[title] = (function(level, title, format, filters, needstack) {
				return (function() {
					return _log(level, title, format, filters, needstack,
							arguments);
				});

			})(i, title, format, filters, needstack);
		}
	}

	return _self;
});
