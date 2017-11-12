var mongoose = require('mongoose')

var CompanySchema = mongoose.Schema({
	email: String,
	password: String,
	company: String
}, {timestamps: true})

mongoose.model('Company', CompanySchema)