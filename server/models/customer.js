var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var CustomerSchema = mongoose.Schema({
	name: String,
	phone: String,
	party: Number,
	companyId: String,
	served: {
	    type: Boolean,
	    default: false
	},
	confirmed: {
	    type: Boolean,
	    default: false
	}
}, {timestamps: true})

CustomerSchema.plugin(autoIncrement.plugin, 'Customer');
mongoose.model('Customer', CustomerSchema)