var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate');

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/contacts');

var contactSchema = require('./schema/contactSchema');

// exports = (function() {
// 	return {
// 		Contact: mongoose.model('Contact', contactSchema)
// 	}
// })();
module.exports = {
	Contact: mongoose.model('Contact', contactSchema)
}