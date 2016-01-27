/**
 * Module dependencies.
 */
"use strict";
var express = require('express'), routes = require('./routes'), conf = require('./config'), logger = require('tracer')[conf.log.strategy]
		(conf.log.setting);
var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	// app.use(express.logger());

	// (ex1)trace all request
	app.use(function(req, res, next) {
		logger.trace(req.method, req.path);
		next();
	});

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	// (ex2)error log
	app.error(function(err, req, res, next) {
		logger.error(err);
		res.send(500);
		// next(err);
	});

//	app.use(express.errorHandler({
//		dumpExceptions : true,
//		showStack : true
//	}));
});

app.configure('production',	function() {
	// (ex3)error log in production
	var logger = require('tracer')[conf.log_prd.strategy]
			(conf.log_prd.setting);
	app.error(function(err, req, res, next) {
		logger.error(err);
		res.send(500);
		//next(err);
	});

//	app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/404', function(req, res) {
	throw new NotFound;
});

app.get('/500', function(req, res) {
	throw new Error('keyboard cat!');
});

app.listen(3000);
logger.log("Express server listening on port %d in %s mode",
		app.address().port, app.settings.env);
