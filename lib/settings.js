"use strict";
var settings = {
	level : undefined
}

//end all of output
var close = function(){
	settings.level = Number.MAX_VALUE;
}

//dynamically change the log level, all of output
var setLevel = function(level){
	settings.level = level;
}

//get the current log level
var getLevel = function(){
	return settings.level;
}


exports.settings = settings;
exports.close = close;
exports.setLevel = setLevel;
exports.getLevel = getLevel;
