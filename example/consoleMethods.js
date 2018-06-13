"use strict";
var logger = require('..').colorConsole();
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
logger.fatal('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

logger.count()
logger.count('default')
logger.count('abc')
logger.count('xyz')
logger.count('abc')
logger.time('100-elements');
for (let i = 0; i < 100; i++) {}
logger.timeEnd('100-elements');

logger.table(['hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object]);
// ┌─────────┬──────────────────────────────┐
// │ (index) │            Values            │
// ├─────────┼──────────────────────────────┤
// │    0    │       'hello %s %d %j'       │
// │    1    │           'world'            │
// │    2    │             123              │
// │    3    │        { foo: 'bar' }        │
// │    4    │ [ 1, 2, 3, ... 1 more item ] │
// │    5    │      [Function: Object]      │
// └─────────┴──────────────────────────────┘

// These can't be parsed as tabular data
console.table(Symbol());
// Symbol()

console.table(undefined);
// undefined

logger.assert(true, 'does nothing');
// OK
logger.assert(false, 'Whoops %s work', 'didn\'t');
// Assertion failed: Whoops didn't work
{
    var logger = require('..').colorConsole({supportConsoleMethods:false});

    logger.table(['hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object]);
    //throw TypeError: logger.table is not a function
}
