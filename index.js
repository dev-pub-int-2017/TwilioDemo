// init express
var express = require('express');
var app = express();

// init mustache
var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/assets', express.static('assets'));

// pull in our twilio stuff
var twilio_sms = require('./models/send_sms.js');
var twilio_fax = require('./models/send_fax.js');

// set up our routes
app.get('/', function(req, res) {
	res.render("index.html");
});

app.post('/send_sms_or_fax', function(req, res) {
	console.log(req.body);

	// what is the destination phone number?
	var phone_number = req.body;

	// what is the text submitted?
	var text = req.body;

	// did user choose to send a fax or an SMS?
	var choice = req.body;
	
	// run our function!
	var succeeded = false;
	
	if(choice == "sms") {
		succeeded = twilio_sms.send_sms(phone_number, text);
	} else if(choice == "fax") {
		succeeded = twilio_fax.send_fax(phone_number, text);
	}

	// notify user of result
	var confirmation_data = {
		phone_number : phone_number,
		text : text,
		choice : choice,
		status : succeeded
	};

	res.render("confirmation.html", confirmation_data);
});

// initialize the server
var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Twilio Demo Started at http://%s:%s", host, port);
});
