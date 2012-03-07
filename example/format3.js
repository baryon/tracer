var tracer = require('tracer')

function test(id){
	var logger = tracer.colorConsole(
				{
					format : "{{timestamp}} " + id + " <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}",
					dateformat : "HH:MM:ss.L"
				});
	logger.log('hello');
	logger.trace('hello', 'world');
	logger.debug('hello %s', 'world', 123);
}

test('ABC');
test('123');