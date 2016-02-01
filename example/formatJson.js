"use strict";
var logger = require('tracer')
		.console(
				{
					format : "{timestamp: '{{timestamp}}', title: '{{title}}', file: '{{file}}', line:'{{line}}', method: '{{method}}', message: '{{message}}' }"
				});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s', 'world', 123);
logger.info('hello %s %d', 'world', 123, {foo : 'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);

