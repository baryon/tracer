"use strict";
var assert = require("assert");

describe('simple', function() {
	var logger = require('../').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.info('hello');
	it("simple logger", function () {
	assert.equal(o['message'], 'hello');
	assert.equal(o['file'], 'test.js');
	assert.equal(o['line'], 11);
	assert.equal(o['level'], 3);
	});
});

describe('stack index', function() {
	var logger = require('../').console({
		stackIndex: 1,
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var logMgr = function(type, msg) {
		return logger[type](msg);
	};
	var o = logMgr('info', 'hello');
	it("stack index", function () {
	assert.equal(o['message'], 'hello');
	assert.equal(o['file'], 'test.js');
	assert.equal(o['line'], 31);
	});
});

describe('simple message' , function() {
	var logger = require('../').console({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.log('hello');
	it("simple message", function () {
	assert.equal(o['output'], 'hello');
	});
});

describe("inspect depth", function() {
	var logger = require('../').console({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		},
		inspectOpt : {
			showHidden : false,
			depth: 1
		}
	});
	var o = logger.log({
		i1 : 'value',
		i2 : {
			i21 : 'val21',
			i22 : {
				i31 : 'val31'
			}
		}
	});
	it("inspect depth", function () {
	assert.equal(o['output'], "{ i1: 'value', i2: { i21: 'val21', i22: [Object] } }");
	});
});

describe("simple color message", function() {
	var logger = require('../').colorConsole({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.debug('hello');
	it("simple color message", function () {
	assert.equal(o.output, '\u001b[36mhello\u001b[39m');
	});
});

describe('console log method' , function() {
	var logger = require('../').console({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.log('hello %s %d %j %t', 'world', 123, {j:'val'}, {t:'val'});
	it("console log method", function () {
	assert.equal(o['title'], 'log');
	assert.equal(o['file'], '');//the format don't include "file", so can't get it
	assert.equal(o['output'], 'hello world 123 {"j":"val"} { t: \'val\' }');
	});
});

describe("custom format", function() {
	var logger = require('../').console({
		format : [
		          "{{message}}", // default format
		          {
		        	  warn : "warn:{{message}}",
		        	  error : "error:{{message}}",
		          }	
		],
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	it("custom format", function () {
	var o = logger.log('hello %s %d', 'world', 123);
	assert.equal(o['output'], 'hello world 123');
	o = logger.warn('hello %s %d', 'world', 123);
	assert.equal(o['output'], 'warn:hello world 123');
	o = logger.error('hello %s %d', 'world', 123);
	assert.equal(o['output'], 'error:hello world 123');
	});
});

describe("custom filter", function() {
	var colors = require('colors');
	var logger = require('../').console({
		format : [
		          "{{message}}", // default format
		          {
		        	  warn : "warn:{{message}}",
		        	  error : "error:{{message}}",
		          }	
		],
		filters:[
		colors.underline,
        {
     	   warn : colors.yellow,
     	   error : [colors.red, colors.bold ]
        }],
        transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.log('hello %s %d', 'world', 123);
	it("custom filter", function () {
	assert.equal(o['output'], '\u001b[4mhello world 123\u001b[24m');
	assert.equal(o['level'], 0);
	o = logger.warn('hello %s %d', 'world', 123);
	assert.equal(o['output'], '\u001b[33mwarn:hello world 123\u001b[39m');
	assert.equal(o['level'], 4);
	o = logger.error('hello %s %d', 'world', 123);
	assert.equal(o['output'], '\u001b[1m\u001b[31merror:hello world 123\u001b[39m\u001b[22m');
	assert.equal(o['level'], 5);
	});
});

describe("set level to log", function() {
	var logger = require('../').console({level:'log',
		transport : function(data) {
			return data;
		}
	});
	it("set level to log", function () {
	assert.ok(logger.log('hello'));
	assert.ok(logger.trace('hello', 'world'));
	assert.ok(logger.debug('hello %s',  'world', 123));
	assert.ok(logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	});
});
describe("set level to 0", function() {
	var logger = require('../').console({level:0,
		transport : function(data) {
			return data;
		}
	});
	it("set level to 0", function () {
	assert.ok(logger.log('hello'));
	assert.ok(logger.trace('hello', 'world'));
	assert.ok(logger.debug('hello %s',  'world', 123));
	assert.ok(logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	});
});
describe("set level to 2", function() {
	var logger = require('../').console({level:2,
		transport : function(data) {
			return data;
		}
	});
	it("set level to 2", function () {
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(logger.debug('hello %s',  'world', 123));
	assert.ok(logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	});
});
describe("set level to warn", function() {
	var logger = require('../').console({level:'warn',
		transport : function(data) {
			return data;
		}
	});
	it("set level to warn", function () {
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(!logger.debug('hello %s',  'world', 123));
	assert.ok(!logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	});
});
describe("set level to error", function() {
	var logger = require('../').console({level:'error',
		transport : function(data) {
			return data;
		}
	});
	it("set level to error", function () {
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(!logger.debug('hello %s',  'world', 123));
	assert.ok(!logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(!logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	});
});
describe("set level to max value", function() {
	var logger = require('../').console({level:Number.MAX_VALUE,
		transport : function(data) {
			return data;
		}
	});
	it("set level to max value", function () {
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(!logger.debug('hello %s',  'world', 123));
	assert.ok(!logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(!logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(!logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	});
});

describe("loop", function() {
	var logger = require('../').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	it("loop", function () {
	for(var i=0; i<100; i++){
		var o = logger.info('hello');
		assert.equal(o['message'], 'hello');
		assert.equal(o['file'], 'test.js');
		assert.equal(o['line'], 267);
		assert.equal(o['level'], 3);
	}
	});
});

describe("setLevel 1", function() {
	var logger = require('../').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	it("setLevel 1", function () {
	require('../').setLevel(2);
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(logger.debug('hello %s',  'world', 123));
	assert.ok(logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	});
});

describe("setLevel 2", function() {
	var logger = require('../').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	it("setLevel 2", function () {
	require('../').setLevel('debug');
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(logger.debug('hello %s',  'world', 123));
	assert.ok(logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	});
});

describe("close", function() {
	var logger = require('../').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	it("close", function () {
	require('../').close();
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(!logger.debug('hello %s',  'world', 123));
	assert.ok(!logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(!logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(!logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
	assert.ok(!logger.fatal('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object, logger));
	});
});

describe("simple", function() {
	var logger = require('../').console();
	var o = logger.log('hello');
	it("recheck simple", function () {
	assert.equal(o['message'], 'hello');
	assert.equal(o['file'], 'test.js');
	assert.equal(o['line'], 333);
	assert.equal(o['level'], 0);
	});
});

