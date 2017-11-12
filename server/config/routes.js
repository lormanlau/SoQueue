var path = require('path')
var company = require('./../controllers/companys.js')
var customer = require('./../controllers/customers.js')

module.exports = function(app){
	app.post('/company/login', company.login);
	app.post('/company/register', company.register);
	app.get('/company/:company_id/customer', customer.listAll);
	app.post('/company/:company_id/customer', customer.create);
	app.post('/company/:company_id/customer', customer.create);
	app.delete('/company/:company_id/customer/:id', customer.delete);
	app.post('/company/:company_id/customer/:id/sms', customer.sendSMS);
}