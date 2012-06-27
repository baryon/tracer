var logger = require('tracer')
		.colorConsole(
				{
					format : [
					          "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
					          {
					        	  error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:{{stacklist}}" // error format
					          }	
					],
					dateformat : "HH:MM:ss.L",
					preprocess :  function(data){
						if(data.title==='error'){
							var callstack = '',len=data.stack.length;
							for(var i=0; i<len; i+=1){
								callstack += '\n'+data.stack[i];
							}
							data.stacklist = callstack;
						}
						
						data.title = data.title.toUpperCase();
						
						if(data.args[0]=='hello'){
							data.message += ' node.js';
						}
					}
				});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s', 'world', 123);
logger.info('hello %s %d', 'world', 123, {foo : 'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);
