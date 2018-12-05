"use strict";
var logger = require('tracer').console({ overwriteConsoleMethods: true });

console.log('hello');
console.trace('hello', 'world');
console.debug('hello %s',  'world', 123);
console.info('hello %s %d',  'world', 123, {foo:'bar'});
console.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
console.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

eval("console.log('hello');");


