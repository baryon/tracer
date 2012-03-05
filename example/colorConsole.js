
var logger = require('tracer').colorConsole();
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

//$ node example/colorConsole.js 
//2012-03-02T13:43:09.27Z <log> colorConsole.js:3 (Object.<anonymous>) hello
//2012-03-02T13:43:09.29Z <trace> colorConsole.js:4 (Object.<anonymous>) hello world
//2012-03-02T13:43:09.29Z <debug> colorConsole.js:5 (Object.<anonymous>) hello world 123
//2012-03-02T13:43:09.29Z <info> colorConsole.js:6 (Object.<anonymous>) hello world 123 { foo: 'bar' }
//2012-03-02T13:43:09.29Z <warn> colorConsole.js:7 (Object.<anonymous>) hello world 123 {"foo":"bar"}
//2012-03-02T13:43:09.29Z <error> colorConsole.js:8 (Object.<anonymous>) hello world 123 {"foo":"bar"} [ 1, 2, 3, 4 ] function Object() { [native code] }