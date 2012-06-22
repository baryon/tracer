var assert = require("assert");

exports["simple"] = function() {
	var logger = require('../').console({
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.info('hello');
	assert.equal(o['message'], 'hello');
	assert.equal(o['file'], 'test.js');
	assert.equal(o['line'], 10);
	assert.equal(o['level'], 3);
}

exports["simple message"] = function() {
	var logger = require('../').console({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.log('hello');
	assert.equal(o['output'], 'hello');
}


exports["simple color message"] = function() {
	var logger = require('../').colorConsole({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.debug('hello');
	assert.equal(o.output, '\u001b[36mhello\u001b[39m');
}

exports["console log method"] = function() {
	var logger = require('../').console({
		format : "{{message}}",
		transport : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.log('hello %s %d', 'world', 123);
	assert.equal(o['title'], 'log');
	assert.equal(o['file'], '');//the format don't include "file", so can't get it
	assert.equal(o['output'], 'hello world 123');
}

exports["custom format"] = function() {
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
	var o = logger.log('hello %s %d', 'world', 123);
	assert.equal(o['output'], 'hello world 123');
	o = logger.warn('hello %s %d', 'world', 123);
	assert.equal(o['output'], 'warn:hello world 123');
	o = logger.error('hello %s %d', 'world', 123);
	assert.equal(o['output'], 'error:hello world 123');
}

exports["custom filter"] = function() {
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
	assert.equal(o['output'], '\u001b[4mhello world 123\u001b[24m');
	assert.equal(o['level'], 0);
	o = logger.warn('hello %s %d', 'world', 123);
	assert.equal(o['output'], '\u001b[33mwarn:hello world 123\u001b[39m');
	assert.equal(o['level'], 4);
	o = logger.error('hello %s %d', 'world', 123);
	assert.equal(o['output'], '\u001b[1m\u001b[31merror:hello world 123\u001b[39m\u001b[22m');
	assert.equal(o['level'], 5);
}

exports["set level to log"] = function() {
	var logger = require('../').console({level:'log',
		transport : function(data) {
			return data;
		}
	});
	assert.ok(logger.log('hello'));
	assert.ok(logger.trace('hello', 'world'));
	assert.ok(logger.debug('hello %s',  'world', 123));
	assert.ok(logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
}
exports["set level to 0"] = function() {
	var logger = require('../').console({level:0,
		transport : function(data) {
			return data;
		}
	});
	assert.ok(logger.log('hello'));
	assert.ok(logger.trace('hello', 'world'));
	assert.ok(logger.debug('hello %s',  'world', 123));
	assert.ok(logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
}
exports["set level to 2"] = function() {
	var logger = require('../').console({level:2,
		transport : function(data) {
			return data;
		}
	});
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(logger.debug('hello %s',  'world', 123));
	assert.ok(logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
}
exports["set level to warn"] = function() {
	var logger = require('../').console({level:'warn',
		transport : function(data) {
			return data;
		}
	});
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(!logger.debug('hello %s',  'world', 123));
	assert.ok(!logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
}
exports["set level to error"] = function() {
	var logger = require('../').console({level:'error',
		transport : function(data) {
			return data;
		}
	});
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(!logger.debug('hello %s',  'world', 123));
	assert.ok(!logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(!logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
}
exports["set level to max value"] = function() {
	var logger = require('../').console({level:Number.MAX_VALUE,
		transport : function(data) {
			return data;
		}
	});
	assert.ok(!logger.log('hello'));
	assert.ok(!logger.trace('hello', 'world'));
	assert.ok(!logger.debug('hello %s',  'world', 123));
	assert.ok(!logger.info('hello %s %d',  'world', 123, {foo:'bar'}));
	assert.ok(!logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'}));
	assert.ok(!logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object));
}