var fs = require('fs');

function read_json_file() {
	var file = './data/contacts.json';
	return fs.readFileSync(file);
}

exports.list = function() {
	return JSON.parse(read_json_file());
};

exports.query = function(number) {
	var json_result = JSON.parse(read_json_file()),
		result = json_result.result;

	for (var i = 0, max = result.length; i < max; i++) {
		var contact = result[i];
		if (contact.primarycontactnumber === number) {
			return contact;
		}
	}
	return null;
};

exports.query_by_arg = function(arg, value) {
	var json_result = JSON.parse(read_json_file());
		result = json_result.result;

	for (var i = 0, max = result.length; i < max; i++) {
		var contact = result[i];
		if (contact[arg] === value) {
			return contact;
		}
	}
	return null;
};

exports.list_groups = function() {
	var json_result = JSON.parse(read_json_file()),
		result = json_result.result;

	var resultArray = new Array();

	for (var i = 0, max = result.length; i < max; i++) {
		var groups = result[i].groups;

		for (var index = groups.length - 1; index >= 0; index--) {
			if (resultArray.indexOf(groups[index]) === -1) {
				resultArray.push(groups[index]);
			}
		}
	}
	return resultArray;
};

exports.get_members = function(group_name) {
	var json_result = JSON.parse(read_json_file()),
		result =json_result.result,
		resultArray = new Array();

	for (var i = result.length - 1; i >= 0; i--) {
		if (result[i].groups.indexOf(group_name) > -1) {
			resultArray.push(result[i]);
		}
	}
	return resultArray;
};