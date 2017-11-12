var path = require('path')
var company = require('./../controllers/companys.js')
var customer = require('./../controllers/customers.js')

module.exports = function(app){
	app.post('/company/login', company.login);
	app.post('/company/register', company.register);
	app.get('/customer', customer.listAll);
	app.delete('/customer/:id', customer.delete);
	app.post('/customer/create', customer.create);
}