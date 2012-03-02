var colors = require('colors');

function f1(str) {
	return str.toUpperCase();
}

var logger = require('tracer').colorConsole({
	level : 1,
	methods : [ 'log0', 'log1', 'log2', 'log3', 'log4', 'log5' ],
	filters : [f1, colors.bold, colors.italic, colors.underline, colors.inverse, colors.yellow],

});
logger.log0('hello');
logger.log1('hello', 'world');
logger.log2('hello %s', 'world', 123);
logger.log4('hello %s %d', 'world', 123);
logger.log5('hello %s %d', 'world', 123);

//$ node example/methods.js 
//2012-03-02T14:10:31.45Z <LOG1> METHODS.JS:14 (OBJECT.<ANONYMOUS>) HELLO WORLD
//2012-03-02T14:10:31.46Z <LOG2> METHODS.JS:15 (OBJECT.<ANONYMOUS>) HELLO WORLD 123
//2012-03-02T14:10:31.46Z <LOG4> METHODS.JS:16 (OBJECT.<ANONYMOUS>) HELLO WORLD 123
//2012-03-02T14:10:31.46Z <LOG5> METHODS.JS:17 (OBJECT.<ANONYMOUS>) HELLO WORLD 123