"use strict";
exports.union = function(obj, args) {
	for (var i = 0, len = args.length; i < len; i += 1) {
		var source = args[i];
		for ( var prop in source) {
			obj[prop] = source[prop];
		}
	}
	return obj;
};

var formatRegExp = /%[sdjt]/g;
var util = require('util');
exports.format = function(f) {
	var inspectOpt = this.inspectOpt;
	var args = arguments;
	var i = 0;

	if (typeof f !== 'string') {
		var objects = [];
		for (; i < args.length; i++) {
			objects.push(util.inspect(args[i], inspectOpt));
		}
		return objects.join(' ');
	}

	i = 1;
	var str = String(f).replace(formatRegExp, function(x) {
		switch (x) {
		case '%s':
			return String(args[i++]);
		case '%d':
			return Number(args[i++]);
		case '%j':
			try {
			    if (args[i] instanceof Error) {
				return JSON.stringify(args[i++], ['message', 'stack', 'type', 'name']);
        		    } else {
            			return JSON.stringify(args[i++]);
        		    }
			} catch(e) {
				return '[Circular]';
			}
		case '%t':
			return util.inspect(args[i++], inspectOpt);
		default:
			return x;
		}
	});
	for ( var len = args.length, x = args[i]; i < len; x = args[++i]) {
		if (x === null || typeof x !== 'object') {
			str += ' ' + x;
		} else {
			str += ' ' + util.inspect(x, inspectOpt);
		}
	}
	return str;
};
