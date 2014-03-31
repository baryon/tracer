exports.union = function(obj, args) {
	for (var i = 0, len = args.length; i < len; i += 1) {
		var source = args[i];
		for ( var prop in source) {
			obj[prop] = source[prop];
		}
	}
	return obj;
};

var formatRegExp = /%[sdj]/g;
var util = require('util');
exports.format = function(f) {
	var inspectOpt = this.inspectOpt;
	var args = arguments;

	if (typeof f !== 'string') {
		var objects = [];
		for ( var i = 0; i < args.length; i++) {
			objects.push(util.inspect(args[i], inspectOpt));
		}
		return objects.join(' ');
	}

	var i = 1;
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
			str += ' ' + util.inspect(x, inspectOpt);
		}
	}
	return str;
}
