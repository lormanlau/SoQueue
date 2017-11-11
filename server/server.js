var express = require('express')
var app = express()

require('./config/mongoose.js');
require('./config/routes.js')(app);

app.listen(8000, function(){
	console.log("Server running on port 8000")
})