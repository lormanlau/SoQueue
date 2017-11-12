var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var querystring = require('querystring')

module.exports = {
	create: function(req, res) {
		console.log(req.body)
		var customer = new Customer(req.body)
		customer.save()
		.then(()=> {
			res.status(200).json({message: "Saved"})
		})
		.catch(errors => {
			res.status(500).json({message: "save errors"})
		})
	},
	delete: function(req, res) {
		let phone = req.query.phone;

		console.log("phone ", phone);

		if (phone) {
			Customer.findById(req.params.id, (error, result) => {
				if (error) {
					res.status(500).json({message: "Could not find customer"})
				} else {
					console.log(result.confirmed);
					if (result.confirmed) {
						console.log("Did not delete confirmed.");
						return;
					}
					console.log(result);

					Customer.findByIdAndUpdate(req.params.id, { $set:{ "served" : true } }, (error, results) => {
						if (error) {
							res.status(500).json({message: "Could not delete customer"})
						} else {
						    response = {
						        message: "successfully deleted",
						        id: results._id
				    		};
				    		res.status(200).json(response);
			    		}
			    		console.log("trying to delete");
					});
	    		}
			});
		} else {
			Customer.findByIdAndUpdate(req.params.id, { $set:{ "served" : true } }, (error, results) => {
				if (error) {
					res.status(500).json({message: "Could not delete customer"})
				} else {
				    response = {
				        message: "successfully deleted",
				        id: results._id
		    		};
		    		res.status(200).json(response);
	    		}
			});
		}
	},
	confirm: function(req, res) {
		Customer.findOneAndUpdate({ "phone" : req.params.phone }, { $set:{ "confirmed" : true } }, (error, results) => {
			if (error) {
				res.status(500).json({message: "Could not confirm customer"})
			} else {
			    response = {
			        message: "successfully confirmed",
			        id: results._id
	    		};
	    		res.status(200).json(response);
    		}
		});
	},
	listAll: function(req, res) {
		let id = req.params.company_id
		Customer.find({companyId: id}, function(error, results){
			if (error) {
				res.status(500).json({message: "could not find all customers"})
			} else {
				res.status(200).json(results)
			}
		})
	},
	listFilter: function(req, res) {
		var search = req.url.substring(req.url.indexOf("?") + 1)
		var params = querystring.parse(search)
		params["name"] = {$regex : params["name"], $options: "i"};
		params["phone"] = {$regex : params["phone"], $options: "i"}
		params["companyId"] = req.params.company_id
		console.log(params)
		Customer.find(params, function(errors, results){
			if (errors){
				res.status(500).json({message: "search could not be done"})
			} else {
				res.status(200).json(results)
			}
		})
	},
	removeSeveredCustomers: function (req, res){
		Customer.remove({companyId: req.params.company_id, served: true}, function(error){
			if (error){
				res.status(500).json({message: "delete serve customer error"})
			} else {
				res.status(200).json({message: "successfully deleted"})
			}
		})
	}
}