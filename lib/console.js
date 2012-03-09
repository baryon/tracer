var dateFormat = require('dateformat');

module.exports = (function() {
	// default config
	var _config = {
		format : "{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}",
		dateformat : "yyyy-mm-dd'T'HH:MM:ss.L'Z'",
		transpot : function(data) {
			console.log(data.output);
		},
		filters : [],
		level : 'log',
		methods : [ 'log', 'trace', 'debug', 'info', 'warn', 'error' ]
	};

	var _union = function(obj, args) {
		var i, len = args.length;
		for (i = 0; i < len; i += 1) {
			var source = args[i];
			for ( var prop in source) {
				obj[prop] = source[prop];
			}
		}
		return obj;
	};

	// union user's config and default
	_config = _union(_config, arguments);

	// main log method
	var _log = function(title, format, filters, args) {
		var msg = msgformat.apply(this, args);
		var data = {
			timestamp : dateFormat(new Date(), _config.dateformat),
			message : msg,
			title : title
		};
		data.method = data.path = data.line = data.pos = data.file = '<unknown>';

		// get call stack, and analyze it, get all file,method and line number
		data.stack = (new Error()).stack.split('\n').slice(3);

		var reg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/ig;
		var sp = reg.exec(data.stack[0]);
		if (sp && sp.length === 5) {
			data.method = sp[1];
			data.path = sp[2];
			data.line = sp[3];
			data.pos = sp[4];
			var paths = data.path.split('/');
			data.file = paths[paths.length - 1];
		}

		// call micro-template to ouput
		data.output = tim(format, data);

		// process every filter method
		var len = filters.length;
		for ( var i = 0; i < len; i += 1) {
			data.output = filters[i](data.output, data);
			if (!data.output)
				return data;// cancel next process if return a false(include
			// null, undefined)
		}
		// trans the final result
		return _config.transpot(data);
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

			var filters;
			if (lastFilter && lastFilter[title])
				filters = Array.isArray(lastFilter[title]) ? lastFilter[title]
						: [ lastFilter[title] ];
			else
				filters = _config.filters;

			_self[title] = (function(title, format, filters) {
				return (function() {
					return _log(title, format, filters, arguments);
				});
			})(title, format, filters);
		}
	}

	return _self;
});

var formatRegExp = /%[sdj]/g;
function msgformat(f) {
	var util = require('util');

	if (typeof f !== 'string') {
		var objects = [];
		for ( var i = 0; i < arguments.length; i++) {
			objects.push(util.inspect(arguments[i]));
		}
		return objects.join(' ');
	}

	var i = 1;
	var args = arguments;
	var str = String(f).replace(formatRegExp, function(x) {
		switch (x) {
		case '%s':
			return String(args[i++]);
		case '%d':
			return Number(args[i++]);
		case '%j':
			return JSON.stringify(args[i++]);
		default:
			return x;
		}
	});
	for ( var len = args.length, x = args[i]; i < len; x = args[++i]) {
		if (x === null || typeof x !== 'object') {
			str += ' ' + x;
		} else {
			str += ' ' + util.inspect(x);
		}
	}
	return str;
}

/*
 * ! Tim (lite) github.com/premasagar/tim
 * 
 * A tiny, secure JavaScript micro-templating script.
 * 
 * by Premasagar Rose dharmafly.com
 * 
 * license opensource.org/licenses/mit-license.php *
 * 
 * creates global object tim *
 * 
 * v0.3.0
 * 
 */

var tim = (function() {
	"use strict";

	var start = "{{", end = "}}", path = "[a-z0-9_][\\.a-z0-9_]*", // e.g.
	// config.person.name
	pattern = new RegExp(start + "\\s*(" + path + ")\\s*" + end, "gi"), undef;

	return function(template, data) {
		// Merge data into the template string
		return template
				.replace(
						pattern,
						function(tag, token) {
							var path = token.split("."), len = path.length, lookup = data, i = 0;

							for (; i < len; i++) {
								lookup = lookup[path[i]];

								// Property not found
								if (lookup === undef) {
									throw "tim: '" + path[i]
											+ "' not found in " + tag;
								}

								// Return the required value
								if (i === len - 1) {
									return lookup;
								}
							}
						});
	};
}());