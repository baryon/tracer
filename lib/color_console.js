var clc = require('cli-color');
module.exports = function(conf) {
	return require('./console')({
		filters : {
			log : function(str){ return clc.black(str) },
			trace : function(str){ return clc.magenta(str) },
			debug : function(str){ return clc.cyan(str) },
			info : function(str){ return clc.green(str) },
			warn : function(str){ return clc.yellow(str) },
			error : function(str){ return clc.red.bold(str) }
		}
	}, conf);
};
