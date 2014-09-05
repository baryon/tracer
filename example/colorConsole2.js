var clc = require('cli-color');

var conf = {
		filters : {
			log : function(str){ return clc.black.bgWhite(str) },
			trace : function(str){ return clc.magenta(str) },
			debug : function(str){ return clc.cyan(str) },
			info : function(str){ return clc.green(str) },
			warn : function(str){ return clc.xterm(202).bgXterm(236)(str) },
			error : function(str){ return clc.red.bold(str) }
		}
	};

console.log(clc.black.bgWhite('hello'), clc.black.bgWhite('world'));
var logger = require('tracer').console(conf);
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
