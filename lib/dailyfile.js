var fs = require('fs'),dateFormat = require('dateformat'), tinytim = require('tinytim'), utils = require('./utils');

module.exports = function(conf) {
	var _conf = {
		root : '.',
		logPathFormat : '{{root}}/{{prefix}}.{{date}}.log',
		splitFormat : 'yyyymmdd'
	};
	
	_conf = utils.union(_conf, [conf]);
	
	function LogFile(prefix, date) {
		this.date = date;
		this.prefix = prefix;
	    this.path = tinytim.tim(_conf.logPathFormat, {root:_conf.root, prefix:prefix, date:date});
	    this.stream = fs.createWriteStream(this.path, {
		    flags: "a",
		    encoding: "utf8",
		    mode: 0666
		});
	}

	LogFile.prototype.write = function(str) {
	    this.stream.write(str+"\n");
	};

	LogFile.prototype.destroy = function() {
	    if (this.stream) {
	        this.stream.end();
	        this.stream.destroySoon();
	        this.stream = null;
	    }
	};

	var _logMap = {};

	function _push2File(str, title) {
	    var logFile = _logMap[title], now = dateFormat(new Date(), _conf.splitFormat)
	    if(logFile && logFile.date != now) {
	        logFile.destroy();
	        logFile = null;
	    }
	    if(!logFile)
	    	logFile = _logMap[title] = new LogFile(title, now);
	    logFile.write(str);
	}

	return require('./console')({
		transport : function(data) {
			_push2File(data.output, data.title);
		}
	}, conf);
};
