"use strict";
import * as assert from "assert";

describe('simple', function() {
	const logger = require('../').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	const o = logger.info('hello');
	it("simple logger", function () {
	assert.strictEqual (o['message'], 'hello');
	assert.strictEqual (o['file'], 'test.ts');
	assert.strictEqual (o['line'], 11);
	assert.strictEqual (o['level'], 3);
	});
});

describe('stack index', function() {
	const logger = require('../').console({
		stackIndex: 1,
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	const logMgr = function(type, msg) {
		return logger[type](msg);
	};
	const o = logMgr('info', 'hello');
	it("stack index", function () {
	assert.strictEqual (o['message'], 'hello');
	assert.strictEqual (o['file'], 'test.ts');
	assert.strictEqual (o['line'], 31);
	});
});

describe('simple message' , function() {
	const logger = require('../').console({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	const o = logger.log('hello');
	it("simple message", function () {
	assert.strictEqual (o['output'], 'hello');
	});
});

describe("inspect depth", function() {
	const logger = require('../').console({
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
	const o = logger.log({
		i1 : 'value',
		i2 : {
			i21 : 'val21',
			i22 : {
				i31 : 'val31'
			}
		}
	});
	it("inspect depth", function () {
	assert.strictEqual (o['output'], "{ i1: 'value', i2: { i21: 'val21', i22: [Object] } }");
	});
});

describe("simple color message", function() {
	const logger = require('../').colorConsole({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	const o = logger.debug('hello');
	it("simple color message", function () {
	assert.strictEqual (o.output, '\u001b[36mhello\u001b[39m');
	});
});

describe('console log method' , function() {
	const logger = require('../').console({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	const o = logger.log('hello %s %d %j %t', 'world', 123, {j:'val'}, {t:'val'});
	it("console log method", function () {
	assert.strictEqual (o['title'], 'log');
	assert.strictEqual (o['file'], '');//the format don't include "file", so can't get it
	assert.strictEqual (o['output'], 'hello world 123 {"j":"val"} { t: \'val\' }');
	});
});

describe("custom format", function() {
	const logger = require('../').console({
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
	let o = logger.log('hello %s %d', 'world', 123);
	assert.strictEqual (o['output'], 'hello world 123');
	o = logger.warn('hello %s %d', 'world', 123);
	assert.strictEqual (o['output'], 'warn:hello world 123');
	o = logger.error('hello %s %d', 'world', 123);
	assert.strictEqual (o['output'], 'error:hello world 123');
	});
});

describe("custom filter", function() {
	const colors = require('colors');
	const logger = require('../').console({
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
	let o = logger.log('hello %s %d', 'world', 123);
	it("custom filter", function () {
	assert.strictEqual (o['output'], '\u001b[4mhello world 123\u001b[24m');
	assert.strictEqual (o['level'], 0);
	o = logger.warn('hello %s %d', 'world', 123);
	assert.strictEqual (o['output'], '\u001b[33mwarn:hello world 123\u001b[39m');
	assert.strictEqual (o['level'], 4);
	o = logger.error('hello %s %d', 'world', 123);
	assert.strictEqual (o['output'], '\u001b[1m\u001b[31merror:hello world 123\u001b[39m\u001b[22m');
	assert.strictEqual (o['level'], 5);
	});
});

describe("set level to log", function() {
	const logger = require('../').console({level:'log',
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
	const logger = require('../').console({level:0,
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
	const logger = require('../').console({level:2,
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
	const logger = require('../').console({level:'warn',
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
	const logger = require('../').console({level:'error',
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
	const logger = require('../').console({level:Number.MAX_VALUE,
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
	const logger = require('../').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	it("loop", function () {
	for(let i=0; i<100; i++){
		const o = logger.info('hello');
		assert.strictEqual (o['message'], 'hello');
		assert.strictEqual (o['file'], 'test.ts');
		assert.strictEqual (o['line'], 267);
		assert.strictEqual (o['level'], 3);
	}
	});
});

describe("setLevel 1", function() {
	const logger = require('../').console({
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
	const logger = require('../').console({
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
	const logger = require('../').console({
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
	const logger = require('../').console();
	const o = logger.log('hello');
	it("recheck simple", function () {
	assert.strictEqual(o['message'], 'hello');
	assert.strictEqual (o['file'], 'test.ts');
	assert.strictEqual (o['line'], 333);
	assert.strictEqual (o['level'], 0);
	});
});

