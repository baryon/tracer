exports.union = function(obj, args) {
	var i, len = args.length;
	for (i = 0; i < len; i += 1) {
		var source = args[i];
		for ( var prop in source) {
			obj[prop] = source[prop];
		}
	}
	return obj;
};

var formatRegExp = /%[sdj]/g;
exports.format = function(f) {
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
