var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var request = require('request')
var https = require('https')
https.post = require('https-post')

app.use(express.static(path.join(__dirname, './../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./config/mongoose.js');
require('./config/routes.js')(app);

app.get('/testSMS', function (req, resp) {

	// TODO: replace recipient and text
	var data = [
		'api_key=72fd6367',
		'api_secret=c3666ff9d604de25',
		'to=',
		'from=12013514403',
		'text="Hello from localhost!"'
	];

	resp.send(data.join('&'));

	// request({
	//     url: 'https://rest.nexmo.com/sms/json',
	//     method: 'POST',
	//     body: data.join('&'),
	//     headers: {
	//     	'Content-Type': 'application/x-www-form-urlencoded'
	//     }
	// }, function (error, response, body){
	//     resp.send(response.body);
	// });
})

app.listen(8000, function(){
	console.log('Server running on port 8000')
})
