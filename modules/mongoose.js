var mongoose = require('mongoose'),
	mongoosePaginate = require('mongoose-paginate');

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/contacts');

var authUserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: {
			unique: true
		}
	},
	password: String,
	role: String
});

var adminUser = new AuthUser({
	username: 'admin',
	password: 'admin',
	role: 'Admin'
});

adminUser.save(function(error) {
	if (!error) {
		adminUser.save();
		console.log('Creating Admin user');
	} else {
		console.log('Admin user already exist');
	}
});

var contactSchema = new mongoose.Schema({
primarycontactnumber: {type: String, index: {unique: true}},
firstname: String,
lastname: String,
title: String,
company: String,
jobtitle: String,
othercontactnumbers: [String],
primaryemailaddress: String,
emailaddresses: [String],
groups: [String]
});

contactSchema.plugin(mongoosePaginate);

// var john_douglas = new Contact({
// 	firstname: "John",
// 	lastname: "Douglas",
// 	title: "Mr.",
// 	company: "Dev Inc.",
// 	jobtitle: "Developer",
// 	primarycontactnumber: "+359777223345",
// 	othercontactnumbers: [],
// 	primaryemailaddress: "john.douglas@xyz.com",
// 	emailaddresses: ["j.douglas@xyz.com"],
// 	groups: ["Dev"]
// });
// john_douglas.save(function(error) {
// 	if (error) {
// 		console.log('Error while saving contact for Mr.John Douglas');
// 		console.log(error);
// 	} else {
// 		john_douglas.save();
// 		console.log('Contact for Mr. John Douglas has been successfully stored');
// 	}
// });

exports.toContact = function() {
	return mongoose.model('Contact', contactSchema);
}