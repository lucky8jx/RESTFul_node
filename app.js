var express = require('express'),
	http = require('http'),
	// path = require('path'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorhandler = require('errorhandler'),
	router = require('./modules/router'),
	expressPaginate = require('express-paginate');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(expressPaginate.middleware(10,100));

if ('development' === app.get('env')) {
	app.use(errorhandler());
}

router.route(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
