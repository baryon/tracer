/*
 * GET home page.
 */

var conf = require('../config'), logger = require('tracer')[conf.log.strategy](conf.log.setting);

exports.index = function(req, res, next) {
	logger.debug('index');
	res.render('index', {
		title : 'Express'
	})
};