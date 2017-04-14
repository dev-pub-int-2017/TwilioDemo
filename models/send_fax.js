var twilio_vars = require('../vars/twilio.js');
var twilio = require('twilio') (twilio_vars.credentials.account_sid, twilio_vars.credentials.auth_token);

function convertTextToPDF(text) {
	// if user chose fax, we have to convert the text to a PDF first!
	return null;
};

module.exports.sendFax = function(phone_number, text) {
	var pdf = convertTextToPDF(text);

	if(pdf == null) {
		console.error("Sorry, PDF conversion did not work.");
		return false;
	}

	var fax = twilio.faxes.create({
		to : phone_number,
		from : twilio_vars.numbers.harlo,
		mediaUrl : pdf;
	}, function(err, fax) {
		console.error("Sorry, Twilio didn't send the fax.");
	});

	console.log(fax);

	return false;
};
