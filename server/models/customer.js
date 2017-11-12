var mongoose = require('mongoose')

var CustomerSchema = mongoose.Schema({
	name: String,
	phone: String,
	numOfPeople: Number
}, {timestamps: true})

mongoose.model('Customer', CustomerSchema)