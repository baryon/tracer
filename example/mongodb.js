var mongo = require('mongoskin');
var db = mongo.db("127.0.0.1:27017/test?auto_reconnect");

//var logger = require('tracer').console();

var dblogger = require('tracer').console({
	transpot : function(data) {
		//logger.info(data.output);
		var loginfo = db.collection("loginfo");
		loginfo.insert( data, function(err, log) {
			if (err) {
				//logger.error(err);
			}
		});
	},
});

dblogger.test('hello');
dblogger.trace('hello', 'world');
dblogger.debug('hello %s',  'world', 123);
dblogger.info('hello %s %d',  'world', 123, {foo:'bar'});
dblogger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
dblogger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

console.log('\n\n\npress ctrl-c to exit');