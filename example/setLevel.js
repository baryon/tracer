"use strict";
var bb = require('./setLevelAnother')
var tracer = require('tracer');
var logger = tracer.console({level:'warn'});

function hello() {
	logger.log('hello');
	logger.trace('hello', 'world');
	logger.debug('hello %s', 'world', 123);
	logger.warn('hello %s', 'world', 123);
	logger.error('hello %s', 'world', 123);
}

console.log('ALL default Level')
hello();
bb.hi()


console.log('setLevel(debug)')
tracer.setLevel('debug');
hello();
bb.hi()


console.log('close all')
tracer.close();

hello();
bb.hi()


console.log('setLevel(0) log')
tracer.setLevel(0);
hello();
bb.hi()
