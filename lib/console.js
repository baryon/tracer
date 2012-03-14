var tinytim = require('tinytim');
var dateFormat = require('dateformat');

module.exports = (function() {
	// default config
	var _config = {
		format : "{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}",
		dateformat : "yyyy-mm-dd'T'HH:MM:ss.L'Z'",
		transport : function(data) {
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
	var _log = function(level, title, format, filters, args) {
		var msg = msgformat.apply(this, args);
		var data = {
			timestamp : dateFormat(new Date(), _config.dateformat),
			message : msg,
			title : title,
			level : level
		};
		data.method = data.path = data.line = data.pos = data.file = '<unknown>';

		// get call stack, and analyze it, get all file,method and line number
		data.stack = (new Error()).stack.split('\n').slice(3);

		var reg1 = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/ig, reg2 = /at\s+()(.*):(\d*):(\d*)/ig, s=data.stack[0];
		var sp = reg1.exec(s) || reg2.exec(s);
		if (sp && sp.length === 5) {
			if(sp[1]) data.method = sp[1];
			data.path = sp[2];
			data.line = sp[3];
			data.pos = sp[4];
			var paths = data.path.split('/');
			data.file = paths[paths.length - 1];
		}

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

			var filters;
			if (lastFilter && lastFilter[title])
				filters = Array.isArray(lastFilter[title]) ? lastFilter[title]
						: [ lastFilter[title] ];
			else
				filters = _config.filters;

			_self[title] = (function(level, title, format, filters) {
				return (function() {
					return _log(level, title, format, filters, arguments);
				});
			})(i, title, format, filters);
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
