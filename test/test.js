var assert = require("assert");

exports["simple message"] = function() {
	var logger = require('../').console({
		format : "{{message}}",
		transpot : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.log('hello');
	assert.equal(o['output'], 'hello');
}

exports["simple console message"] = function() {
	var logger = require('../').colorConsole({
		format : "{{message}}",
		transpot : function(data) {
			console.log(data.output);
			return data;
		}
	});
	var o = logger.debug('hello');
	assert.equal(o.output, '\u001b[34mhello\u001b[39m');
}
