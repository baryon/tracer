var logger = require('tracer').console({level:2});
logger.test('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

//$ node example/level.js 
//2012-03-02T13:41:33.17Z <debug> level.js:4 (Object.<anonymous>) hello world 123
//2012-03-02T13:41:33.28Z <info> level.js:5 (Object.<anonymous>) hello world 123 { foo: 'bar' }
//2012-03-02T13:41:33.29Z <warn> level.js:6 (Object.<anonymous>) hello world 123 {"foo":"bar"}
//2012-03-02T13:41:33.30Z <error> level.js:7 (Object.<anonymous>) hello world 123 {"foo":"bar"} [ 1, 2, 3, 4 ] function Object() { [native code] }
