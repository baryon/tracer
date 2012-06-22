var conf = {
		log_dev : {
			strategy : 'colorConsole',
			setting : {
				level : 'log'
			}
		},
		log_prd : {
			strategy : 'console',
			setting : {
				level : 'warn'
			}
		}
};

var tracer = require('tracer')

function test(c){
	var logger = tracer[c.strategy](c.setting);
	logger.log('hello');
	logger.trace('hello', 'world');
	logger.debug('hello %s', 'world', 123);
	logger.warn('hello %s', 'world', 123);
	logger.error('hello %s', 'world', 123);
}


test(conf.log_dev);

test(conf.log_prd);



