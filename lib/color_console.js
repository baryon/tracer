var colors = require('colors/safe');
module.exports = function(conf) {
	var filter = function(fn){
		return function(str){ return fn(str) };
		};
	return require('./console')({
		filters : {
			log : filter(colors.black.bgWhite),
			trace : filter(colors.magenta),
			debug : filter(colors.cyan),
			info : filter(colors.green),
			warn : filter(colors.yellow),
			error : filter(colors.red.bold)
		}
	}, conf);
};
