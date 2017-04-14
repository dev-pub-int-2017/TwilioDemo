var twilio_vars = require('../vars/twilio.js');
var twilio = require('twilio') (twilio_vars.credentials.account_sid, twilio_vars.credentials.auth_token);

module.exports.sendSMS = function(phone_number, text) {

	var sms = twilio.messages.create({
		to : phone_number,
		from : twilio_vars.numbers.harlo,
		body : text
	}, function(err, message) {
		console.error("Sorry, Twilio didn't send the SMS");
	});

	console.log(sms);
	return false;
};