"use strict";
var colors = require('colors/safe');

function f1(str) {
	return str.toUpperCase();
}

var logger = require('tracer').colorConsole({
	filters : [
	           f1, colors.underline, colors.blue, //default filter
	           //the last item can be custom filter. here is "warn" and "error" filter
	           {
	        	   warn : colors.yellow,
	        	   error : [f1, colors.red.bold ]
	           }
	]
});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
