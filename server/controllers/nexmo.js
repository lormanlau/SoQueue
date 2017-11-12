var customer = require('./../controllers/customers.js');
var request = require('request');

module.exports = {
	handleInboundSMS: function(req, res){
		let params = req.query;
		console.log(params);
		
		if (!params.to || !params.msisdn) {
			console.log('This is not a valid inbound SMS message!');
		} else {
			console.log('Success');
			let incomingData = {
				messageId: params.messageId,
				from: params.msisdn,
				text: params.text,
				type: params.type,
				timestamp: params['message-timestamp']
			};

			req.params.phone = params.msisdn;

			if (params.text.toLocaleLowerCase() === "cancel") {
				customer.deleteOne(req, res);
			} else if (params.text.toLocaleLowerCase().includes("confirm")) {
				customer.confirm(req, res);
			}
			// res.send(incomingData);
		}

		// res.status(200).end();
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