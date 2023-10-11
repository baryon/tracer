"use strict";
exports.console = require('./console');
exports.colorConsole = require('./color_console');

//diasble dayilyfile when no nodejs env
const isNode = typeof global === 'object' && global.process && global.process.versions && global.process.versions.node;
if (isNode) {
  exports.dailyfile = require('./dailyfile');
}

//global settings
var settings = require('./settings');
exports.close = settings.close;
exports.setLevel = settings.setLevel;
exports.getLevel = settings.getLevel;
