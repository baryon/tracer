"use strict";
exports.console = require('./console');
exports.colorConsole = require('./color_console');
exports.dailyfile = require('./dailyfile');

//global settings
var settings = require('./settings');
exports.close = settings.close;
exports.setLevel = settings.setLevel;
exports.getLevel = settings.getLevel;
