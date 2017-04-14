var twilio_vars = require('../vars/twilio.js');
var twilio = require('twilio') (twilio_vars.credentials.account_sid, twilio_vars.credentials.auth_token);

var pdfkit = require('pdfkit');
var fs = require('fs');
var path = require('path');

function convertTextToPDF(phone_number, text) {
	// if user chose fax, we have to convert the text to a PDF first!
	var pdf = new pdfkit();
	pdf.text(text);

	// generate a filename to return
	var pdf_path = path.join(__dirname, "/tmp/", "text_to_pdf_" + phone_number + ".pdf");
	console.info(pdf_path);

	// save it to disk
	pdf.pipe(fs.createWriteStream(pdf_path));
	pdf.end();

	return pdf_path;
};

module.exports.sendFax = function(phone_number, text) {
	console.log("Preparing to send a fax...");

	// quick pdf kit test:
	convertTextToPDF(phone_number, text);

	/*
	twilio.faxes.create({
		to : phone_number,
		from : twilio_vars.numbers.harlo,
		mediaUrl : convertTextToPDF(phone_number, text)
	}, function(err, fax) {
		if(err != null) {
			console.error("Sorry, Twilio didn't send the fax");
			console.error(err);
		}

		// delete from disk!

		console.log(fax);
	});
	*/
};
