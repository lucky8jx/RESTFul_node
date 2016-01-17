var _v1 = require('./contactdataservice_1'),
	_v2 = require('./contactdataservice_2'),
	url = require('url'),
	// model = require('./mongoose');
	model = require('../db/model');

// var Contact = model.toContact();
var Contact = model.Contact;
console.log(model);

exports.route = function(app) {
	app.get('/v1/contacts/:number', function(request, response) {
		console.log(request.url + ' : querying for ' + request.params.number);
		_v1.findByNumber(Contact, request.params.number, response);
	});
	app.post('/v1/contacts', function(request, response) {
		_v1.update(Contact, request.body, response)
	});
	app.put('/v1/contacts', function(request, response) {
		_v1.create(Contact, request.body, response)
	});
	app.delete('/v1/contacts/:primarycontactnumber', function(request, response) {
		_v1.remove(Contact, request.params.primarycontactnumber, response);
	});

	app.get('/v1/contacts', function(request, response) {
		console.log('Listing all contacts with ' + request.params.key + '=' + request.params.value);
		_v1.list(Contact, response);
	})
	app.get('/contacts', function(request, response) {
		// var get_params = url.parse(request.url, true).query;
		// if (Object.keys(get_params).length === 0) {
		// 	_v2.list(Contact, response);
		// } else {
		// 	var key = Object.keys(get_params)[0];
		// 	var value = get_params[key];
		// 	JSON.stringify(_v2.query_by_arg(Contact, key, value, response));
		// }
		console.log('redirecting to /v2/contacts');
		response.writeHead(302, {'Location': '/v2/contacts'});
		response.end('Version 2 is found at URI /v2/contacts');
	});
	app.get('/v2/contacts', function(request, response) {
		var get_params = url.parse(request.url, true).query;
		if (Object.keys(get_params).length === 0) {
			_v2.list(Contact, response);
			// _v2.paginate(Contact, request, response);
		} else {
			if (!!get_params['limit'] || !!get_params['page'] ) {
				_v2.paginate(Contact, request, response);
			} else {
				var key = Object.keys(get_params)[0];
				var value = get_params[key];
				JSON.stringify(_v2.query_by_arg(Contact, key, value, response));
			}
			
			
		}
	});
};