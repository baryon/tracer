var assert = require("assert");

exports["simple message"] = function() {
	var logger = require('tracer').console({
		format : "{{message}}",
		transpot : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.test('hello');
	assert.equal(o['output'], 'hello');
}

exports["simple console message"] = function() {
	var logger = require('tracer').colorConsole({
		format : "{{message}}",
		transpot : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.test('hello');
	assert.equal(o.output, '\u001b[35mhello\u001b[39m');
}
