exports.union = function(obj, args) {
	for (var i = 0, len = args.length; i < len; i += 1) {
		var source = args[i];
		for ( var prop in source) {
			obj[prop] = source[prop];
		}
	}
	return obj;
};

var formatRegExp = /%[sdji]/g;
var util = require('util');
// overwrite util format
exports.format = function(f) {

	var i = 0;
	var args = arguments;
	var len = args.length;
	var inspectOpt = this.inspectOpt;
	if (typeof f !== 'string') {
		var objects = [];
		for (; i < len; i++) {
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
				return JSON.stringify(args[i++]);
			case '%i':
				return util.inspect(args[i++], inspectOpt);
			default:
				return x;
		}
	});
	for (; i < len; i++) {
		var x = args[i];
		if (x === null || typeof x !== 'object') {
			str += ' ' + x;
		} else {
			str += ' ' + util.inspect(x, inspectOpt);
		}
	}
	return str;
};
