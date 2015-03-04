var colors = require('colors'); //~1.0.3
var tracer = require('tracer');

var log = tracer.colorConsole({
  level: 'trace',
  format : [
    "{{timestamp}} |-{{title}} {{message}}"
  ],
  filters : [
    function(str){return str.blue; }, //default filter
  ],
  methods: [ 'trace', 'debug', 'info', 'warn', 'error', 'stack' ]
});

log.info('info');
log.trace('trace');
log.warn('warn');
log.error('error');
log.stack('stack');
