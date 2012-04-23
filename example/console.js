
var logger = require('tracer').console();
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

eval("logger.log('hello');");


//$ node console.js 
//2012-04-23T01:56:56.296Z <log> console.js:3 (Object.<anonymous>) hello
//2012-04-23T01:56:56.316Z <trace> console.js:4 (Object.<anonymous>) hello world
//2012-04-23T01:56:56.318Z <debug> console.js:5 (Object.<anonymous>) hello world 123
//2012-04-23T01:56:56.320Z <info> console.js:6 (Object.<anonymous>) hello world 123 { foo: 'bar' }
//2012-04-23T01:56:56.320Z <warn> console.js:7 (Object.<anonymous>) hello world 123 {"foo":"bar"}
//2012-04-23T01:56:56.321Z <error> console.js:8 (Object.<anonymous>) hello world 123 {"foo":"bar"} [ 1, 2, 3, 4 ] function Object() { [native code] }
//2012-04-23T01:56:56.323Z <log> console.js:10 (Object.<anonymous> (eval at <anonymous>) hello