#tracer for node.js

A powerful and customizable logging library for node.js.

===========
##Features
-----

* print log messages with timstamp, file name, method name, line number, path or call stack
* be customized output format with micro-template and timestamp format
* support user-defined logging levels
* add easily any transport 
* support filter functions, so print statements in full color and font (color console)

##Install
-----
```javascript
npm install tracer
```

Usage
-----
Add to your code:

```javascript
var logger = require('tracer').console();
```


```javascript
var logger = require('tracer').colorConsole();
```


```javascript
var logger = require('tracer').colorConsole({level:2});
```


Simple Example
--------------

```javascript
var logger = require('tracer').console();
logger.test('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

$ node example/console.js 
2012-03-02T13:35:22.83Z <test> console.js:3 (Object.<anonymous>) hello
2012-03-02T13:35:22.85Z <trace> console.js:4 (Object.<anonymous>) hello world
2012-03-02T13:35:22.85Z <debug> console.js:5 (Object.<anonymous>) hello world 123
2012-03-02T13:35:22.85Z <info> console.js:6 (Object.<anonymous>) hello world 123 { foo: 'bar' }
2012-03-02T13:35:22.85Z <warn> console.js:7 (Object.<anonymous>) hello world 123 {"foo":"bar"}
2012-03-02T13:35:22.85Z <error> console.js:8 (Object.<anonymous>) hello world 123 {"foo":"bar"} [ 1, 2, 3, 4 ] function Object() { [native code] }
```


Advanced Example
---------------

Take a look at the examples directory for different examples.

### Set logging level
```javascript
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

// test and trace was not be ouputed 

'''



### Customize output format
format tag:
*  timestamp: current time 
*  title: method name, default is 'test', 'trace', 'debug', 'info', 'warn', 'error'
*  message: printf message, support %s string, %d number, %j JSON and auto inspect
*  file: file name
*  line: line number
*  pos: postion
*  path: file's path
*  method: method name of caller
*  stack: call statck

About [Date Format](http://blog.stevenlevithan.com/archives/date-time-format)

```javascript
var logger = require('tracer').console(
				{
					format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
					dateformat : "HH:MM:ss.L"
				});

'''



### Customize methods and filters 

each filtes function was called. the function must be like

```javascript
function f1(str) {
	return str.toUpperCase();
}
'''

About [Colors.js](https://github.com/Marak/colors.js)

```javascript
var colors = require('colors');
var logger = require('tracer').colorConsole({
	level : 1,
	methods : [ 'log0', 'log1', 'log2', 'log3', 'log4', 'log5' ],
	filters : [colors.bold, colors.italic, colors.underline, colors.inverse, colors.yellow],

});
logger.log0('hello');
logger.log1('hello', 'world');
logger.log2('hello %s', 'world', 123);
logger.log4('hello %s %d', 'world', 123);
logger.log5('hello %s %d', 'world', 123);

//$ node example/methods.js 
//2012-03-02T13:49:36.89Z <log1> methods.js:10 (Object.<anonymous>) hello world
//2012-03-02T13:49:36.90Z <log2> methods.js:11 (Object.<anonymous>) hello world 123
//2012-03-02T13:49:36.91Z <log4> methods.js:12 (Object.<anonymous>) hello world 123
//2012-03-02T13:49:36.91Z <log5> methods.js:13 (Object.<anonymous>) hello world 123

'''



### MongoDB Transport
```javascript
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

```


	
## History


### 0.1.0

* Initial Tracer implementation.

## License 

(The MIT License)

Copyright (c) 2012 LI Long;ld &lt;lilong@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.