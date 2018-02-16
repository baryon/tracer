"use strict";
var colors = require('colors/safe');
module.exports = function(conf) {
	return require('./console')({
		filters : {
			//log : do nothing
			trace : colors.magenta,
			debug : colors.cyan,
			info : colors.green,
			warn : colors.yellow,
			error : colors.red.bold,
			fatal : colors.red.bold
		}
	}, conf);
};
