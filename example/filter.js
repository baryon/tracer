var colors = require('colors');

function f1(str, data) {
	if( data.title === 'error' ){
		// do some thing, ex: write to database
		
		// if you don't want continue other filter, then
		//return false; 
	}
	return str.toUpperCase();
}

var logger = require('tracer').colorConsole({
	filters : [
	           f1, colors.underline, colors.blue, //default filter
	           //the last item can be custom filter. here is "warn" and "error" filter
	           {
	        	   warn : colors.yellow,
	        	   error : [f1, colors.red, colors.bold ]
	           }
	]
});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
