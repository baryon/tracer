"use strict";
var fs = require('fs'), dateFormat = require('dateformat'), tinytim = require('tinytim'), utils = require('./utils'), spawn = require('child_process').spawn, spawnSync = require('child_process').spawnSync;
// var path = require('path');
var os = require('os');
var mkdirp = require('mkdirp');

function checkLogFile(path) {
    if (os.type() === 'Windows_NT') {
        if (!fs.existsSync(path)) {
            mkdirp(path);
        }
    } else {
        spawnSync('mkdir', ['-p', path]);
    }
}

module.exports = function (conf) {
    var _conf = {
        root: '.',
        logPathFormat: '{{root}}/{{prefix}}.{{date}}.log',
        splitFormat: 'yyyymmdd',
        allLogsFileName: false,
        maxLogFiles: 10
    };

    _conf = utils.union(_conf, [conf]);

    function LogFile(prefix, date) {
        this.date = date;
        this.path = tinytim.tim(_conf.logPathFormat, { root: _conf.root, prefix: prefix, date: date });
        checkLogFile(_conf.root);
        this.stream = fs.createWriteStream(this.path, {
            flags: "a",
            encoding: "utf8",
            mode: parseInt('0644', 8)
            // When engines node >= 4.0.0, following notation will be better:
            //mode: 0o644
        });
    }

    LogFile.prototype.write = function (str) {
        this.stream.write(str + "\n");
    };

    LogFile.prototype.destroy = function () {
        if (this.stream) {
            this.stream.end();
            this.stream.destroySoon();
            this.stream = null;
        }
    };

    var _logMap = {};

    function _push2File(str, title) {
        if (_conf.allLogsFileName) {
            var allLogFile = _logMap.allLogFile, now = dateFormat(new Date(), _conf.splitFormat);
            if (allLogFile && allLogFile.date != now) {
                allLogFile.destroy();
                allLogFile = null;
            }
            if (!allLogFile) {
                allLogFile = _logMap.allLogFile = new LogFile(_conf.allLogsFileName, now);
                spawn('find', [_conf.root, '-type', 'f', '-name', '*.log', '-mtime', '+' + _conf.maxLogFiles, '-exec', 'rm', '{}', ';']);
            }
            allLogFile.write(str);
        } else {
            var logFile = _logMap[title], nowAgain = dateFormat(new Date(), _conf.splitFormat);
            if (logFile && logFile.date != nowAgain) {
                logFile.destroy();
                logFile = null;
            }
            if (!logFile) {
                logFile = _logMap[title] = new LogFile(title, nowAgain);
                spawn('find', [_conf.root, '-type', 'f', '-name', '*.log', '-mtime', '+' + _conf.maxLogFiles, '-exec', 'rm', '{}', ';']);
            }
            logFile.write(str);
        }
    }

    function dailyFileTransport(data) {
        _push2File(data.output, data.title);
    }

    if (conf.transport) {
        conf.transport = Array.isArray(conf.transport) ? conf.transport : [conf.transport];
        conf.transport.push(dailyFileTransport)
    } else {
        conf.transport = [dailyFileTransport];
    }
    return require('./console')(conf);
};
