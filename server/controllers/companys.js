var mongoose = require('mongoose');
var Company = mongoose.model('Company');

module.exports = {
	login: function(req, res){
		Company.findOne({email: req.params.email}, function(errors, results){
			if (errors){
				res.status(500).json(errors)
			} else {
				if (results == null){
					res.status(500).json({message: "Wrong password or email"})
				} else if (results["password"] == req.params.password){
					res.status(200).json(results)
				} else {
					res.status(500).json({message: "Wrong password or email"})
				}
			}
		})
	},
	register: function(req, res){
		var company = new Company(req.body)
		company.save()
		.then(() => {
			res.status(200).json({message: "successfully created"})
		})
		.catch(errors => { 
			res.status(500).json({message: errors})
		});
	}
}