var mongoose = require('mongoose')

var CustomerSchema = mongoose.Schema({
	name: String,
	phone: String,
	party: Number,
	companyId: String,
	served: {
	    type: Boolean,
	    default: false
	}
}, {timestamps: true})

mongoose.model('Customer', CustomerSchema)