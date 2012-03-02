var colors = require('colors');
module.exports = function(conf) {
	return require('./console')({
		filters : {
			test : colors.magenta,
			debug : colors.blue,
			info : colors.green,
			warn : colors.yellow,
			error : [ colors.red, colors.bold ]
		}
	}, conf);
};
