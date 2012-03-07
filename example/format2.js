var logger = require('tracer')
		.colorConsole(
				{
					format : [
					          "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
					          {
					        	  error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack: {{stack}}" // error format
					          }	
					],
					dateformat : "HH:MM:ss.L"
				});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s', 'world', 123);
logger.info('hello %s %d', 'world', 123, {foo : 'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
