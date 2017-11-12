var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = {
	create: function(req, res) {
		var customer = new Customer(req.body)
		customer.save()
		.then(()=> {
			res.status(200).json({message: "Saved"})
		})
		.catch(errors => {
			res.status(500).json({message: "save errors"})
		})
	},
	delete: function(req, res){
		Customer.findByIdAndRemove(req.params.id, (error, results) => {
			if (error) {
				res.status(500).json({message: "Could not delete customer"})
			} else {
			    response = {
			        message: "Todo successfully deleted",
			        id: results._id
	    		};
	    		res.status(200).json(response);
    		}
		});
	},
	listAll: function(req, res){
		Customer.find({}, function(error, results){
			if (error) {
				res.status(500).json({message: "could not find all customers"})
			} else {
				res.status(200).json(results)
			}
		})
	}
}