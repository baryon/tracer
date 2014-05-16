var fs = require('fs');

var logger = require('tracer').console({
	transport : function(data) {
			console.log(data.output);
			var logStream = fs.createWriteStream("./stream.log", {
			    flags: "a",
			    encoding: "utf8",
			    mode: 0666
			});
			logStream.write(data.output+"\n");
			logStream.end();
		}
});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

