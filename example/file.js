var fs = require('fs');

var logger = require('tracer').console({
	transport : function(data) {
		console.log(data.output);
		fs.open('./file.log', 'a', 0666, function(e, id) {
			fs.write(id, data.output+"\n", null, 'utf8', function() {
				fs.close(id, function() {
				});
			});
		});
	}
});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s', 'world', 123);
logger.info('hello %s %d', 'world', 123, {foo : 'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
