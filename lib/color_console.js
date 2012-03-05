var colors = require('colors');
module.exports = function(conf) {
	return require('./console')({
		filters : {
			//log : colors.black,
			trace : colors.magenta,
			debug : colors.blue,
			info : colors.green,
			warn : colors.yellow,
			error : [ colors.red, colors.bold ]
		}
	}, conf);
};
