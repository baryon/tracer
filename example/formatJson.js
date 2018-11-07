"use strict";
var logger = require('..').console( {
    // format: "{timestamp: '{{timestamp}}', title: '{{title}}', file: '{{file}}', line:'{{line}}', method: '{{method}}', message: '{{message}}' }"
    transport : function(data) {
		//if you dont need JSON.stringify, just remove it
        console.log(JSON.stringify({
            timestamp: data.timestamp,
            title: data.title,
            file: data.file,
            line: data.line,
            method: data.method,
            message: data.message
        }));
    }
  });
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

eval("logger.log('hello');");
