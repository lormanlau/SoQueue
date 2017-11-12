var mongoose = require('mongoose');
var Company = mongoose.model('Company');

module.exports = {
	login: function(req, res){
		Company.findOne({email: req.body.email}, function(errors, results){
			if (errors){
				res.status(500).json(errors)
			} else {
				if (results == null){
					res.status(401).json({message: "Wrong password or email"})
				} else if (results["password"] == req.body.password){
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
			console.log(company)
			res.status(200).json(company)
		})
		.catch(errors => { 
			res.status(500).json({message: errors})
		});
	}
}