var clc = require('cli-color');

var conf = {
		filters : {
			log : clc.black.bgWhite,
			trace : clc.magenta,
			debug : clc.cyan,
			info : clc.green,
			warn : clc.yellow,
			error : clc.red.bold
		}
	};


var logger = require('tracer').console(conf);
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
