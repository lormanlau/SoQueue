var mongoose = require('mongoose')

var CustomerSchema = mongoose.Schema({
	number: Number,
	phone: String,
	numOfPeople: Number
}, {timestamps: true})

mongoose.model('Customer', CustomerSchema)