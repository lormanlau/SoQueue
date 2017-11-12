var mongoose = require('mongoose')

var CustomerSchema = mongoose.Schema({
	name: String,
	phone: String,
	party: Number,
	companyId: Number
}, {timestamps: true})

mongoose.model('Customer', CustomerSchema)