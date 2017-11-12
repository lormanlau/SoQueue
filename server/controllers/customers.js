var mongoose = require('mongoose');
var request = require('request');
var Customer = mongoose.model('Customer');

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
		Customer.findByIdAndUpdate(req.params.id, {$set:{"served" : true}}, (error, results) => {
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
	sendSMS: function(req, resp) {
		let payload = [
			'api_key=72fd6367',
			'api_secret=c3666ff9d604de25',
			`to= ${req.body.phone}`,
			'from=12013514403',
			`text=${req.body.text}`
			].join('&');

		request({
		    url: 'https://rest.nexmo.com/sms/json',
		    method: 'POST',
		    body: payload,
		    headers: {
		    	'Content-Type': 'application/x-www-form-urlencoded'
		    }
		}, function (error, response, body){
		    resp.send(response.body);
		});
	}
}