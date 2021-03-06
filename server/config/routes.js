var path = require('path')
var company = require('./../controllers/companys.js')
var customer = require('./../controllers/customers.js')
var nexmo = require('./../controllers/nexmo.js')

module.exports = function(app){
	app.post('/company/login', company.login);
	app.post('/company/register', company.register);
	app.get('/company/:company_id/customer', customer.listAll);
	app.get('/company/:company_id/search', customer.listFilter);
	app.post('/company/:company_id/customer', customer.create);
	app.delete('/company/:company_id/customer/servedclear', customer.removeSeveredCustomers);
	app.delete('/company/:company_id/customer/:id', customer.delete);
	app.post('/company/:company_id/customer/:id/sms', nexmo.sendSMS);
	app.get('/company', company.getAllCompanies);
	app.get('/inbound', nexmo.handleInboundSMS);
	app.all("*", (req, res, next) => {
		res.sendFile(path.resolve("./../client/dist/index.html"))
	});
}