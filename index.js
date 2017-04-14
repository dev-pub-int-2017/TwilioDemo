// init express
var express = require('express');
var app = express();

// init mustache
var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/assets', express.static('assets'));

// since we're using form input, express needs body-parser
var body_parser = require('body-parser');
app.use(body_parser.urlencoded({
	extended : true
}));

// pull in our twilio stuff
var twilio_sms = require('./models/send_sms.js');
var twilio_fax = require('./models/send_fax.js');

// set up our routes
app.get('/', function(req, res) {
	res.render("index.html");
});

app.post('/send_sms_or_fax', function(req, res) {	
	// run our function!	
	if(req.body.choice == "sms") {
		twilio_sms.sendSMS(req.body.phone_number, req.body.text);
	} else if(choice == "fax") {
		twilio_fax.sendFax(req.body.phone_number, req.body.text);
	}

	// notify user of result
	res.render("confirmation.html", req.body);
});

// initialize the server
var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Twilio Demo Started at http://%s:%s", host, port);
});
