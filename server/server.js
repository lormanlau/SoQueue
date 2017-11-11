var express = require('express')
var app = express()
var path = require('path')

app.use(express.static(path.join(__dirname, './../client/dist')));

require('./config/mongoose.js');
require('./config/routes.js')(app);

app.listen(8000, function(){
	console.log("Server running on port 8000")
})