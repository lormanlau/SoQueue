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

app.listen(8000, function(){
	console.log('Server running on port 8000')
})
