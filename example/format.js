"use strict";
var logger = require('tracer')
		.console(
				{
					format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
					dateformat : "HH:MM:ss.L"
				});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s', 'world', 123);
logger.info('hello %s %d', 'world', 123, {foo : 'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);


//$ node example/format.js 
//13:52:30.61 <log> hello (in format.js:7)
//13:52:30.63 <trace> hello world (in format.js:8)
//13:52:30.63 <debug> hello world 123 (in format.js:9)
//13:52:30.63 <info> hello world 123 { foo: 'bar' } (in format.js:10)
//13:52:30.63 <warn> hello world 123 {"foo":"bar"} (in format.js:13)
//13:52:30.63 <error> hello world 123 {"foo":"bar"} [ 1, 2, 3, 4 ] function Object() { [native code] } (in format.js:16)
