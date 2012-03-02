
var logger = require('tracer').console();
logger.test('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);


//$ node example/console.js 
//2012-03-02T13:42:00.99Z <test> console.js:3 (Object.<anonymous>) hello
//2012-03-02T13:42:01.02Z <trace> console.js:4 (Object.<anonymous>) hello world
//2012-03-02T13:42:01.03Z <debug> console.js:5 (Object.<anonymous>) hello world 123
//2012-03-02T13:42:01.05Z <info> console.js:6 (Object.<anonymous>) hello world 123 { foo: 'bar' }
//2012-03-02T13:42:01.07Z <warn> console.js:7 (Object.<anonymous>) hello world 123 {"foo":"bar"}
//2012-03-02T13:42:01.07Z <error> console.js:8 (Object.<anonymous>) hello world 123 {"foo":"bar"} [ 1, 2, 3, 4 ] function Object() { [native code] }
