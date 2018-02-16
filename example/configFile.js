"use strict";
var logger = require('tracer').console(__dirname + '/configFile2.js');
//var logger = require('tracer').console(__dirname + '/configFile3.json');

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s', 'world', 123);
logger.info('hello %s %d', 'world', 123, {foo : 'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
logger.fatal('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
