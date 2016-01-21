// Run as:
// $> node stress.js
"use strict";
function stress_log(log) {
    var i;
    for (i = 0; i < 100000; ++i) {
        log.info("Counter Value = %s", i);
    }
}

function test_tracer() {
    var log = require('tracer').console({
    	transport : function(data) {}
    });
    
    console.time('test_tracer');
    stress_log(log);
    console.timeEnd('test_tracer');
}


function test_tracer_skip() {
    var log = require('tracer').console({
    	level:"warn",
    	transport : function(data) {}
    });
    
    console.time('test_tracer_skip');
    stress_log(log);
    console.timeEnd('test_tracer_skip');
}


function test_tracer_nostack() {
	//if the format don't include "method|path|line|pos|file", the speed will be up
    var log = require('tracer').console({
    	format: "{{timestamp}} <{{title}}> {{message}}",
    	transport : function(data) {}
    });
    
    console.time('test_tracer_nostack');
    stress_log(log);
    console.timeEnd('test_tracer_nostack');
}

test_tracer();
test_tracer_skip();
test_tracer_nostack();

