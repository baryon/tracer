"use strict";
var colors = require('colors');

var logger = require('tracer').colorConsole({
	level : 'log1',
	methods : [ 'log0', 'log1', 'log2', 'log3', 'log4', 'log5' ],
	filters : [colors.underline, colors.yellow],

});
logger.log0('hello');
logger.log1('hello', 'world');
logger.log2('hello %s', 'world', 123);
logger.log4('hello %s %d', 'world', 123);
logger.log5('hello %s %d', 'world', 123);

//$ node example/methods.js 
//2012-03-07T10:09:16.23Z <log1> methods.js:10 (Object.<anonymous>) hello world
//2012-03-07T10:09:16.24Z <log2> methods.js:11 (Object.<anonymous>) hello world 123
//2012-03-07T10:09:16.24Z <log4> methods.js:12 (Object.<anonymous>) hello world 123
//2012-03-07T10:09:16.24Z <log5> methods.js:13 (Object.<anonymous>) hello world 123
