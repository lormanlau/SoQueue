import { Component, OnInit } from '@angular/core';
import { LoginregService } from './../loginreg.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginregService]
})

export class DashboardComponent implements OnInit {

  constructor(private _LRService: LoginregService) { }

  ngOnInit() { 
  	this.clear();
  	this.getCustomers();
	}

  newCustomer: {}

  customers: any[] = []

  addCustomer() {
  	this._LRService.addCustomer(this.newCustomer);
  	this.clear();
  	this.getCustomers();
  }

  clear() {
  	this.newCustomer = {
	  	name: undefined,
	  	phone: undefined,
	  	party: undefined,
      companyId: localStorage.getItem('companyId')
	  };
  }

  getCustomers() {
  	this._LRService.getCompanyCustomers()
    .then(res => {
      console.log(res)
  		this.customers = res.json();
  		}
  	);
  }

  removeCustomer(event, customer) {
  	let element = event.target;
  	element.closest('tr').classList.add("strike-through");
  	this._LRService.removeCustomer(customer._id);
  }

  sendSMS(customer) {
    if (!customer.phone || customer.phone.length < 10) {
      alert("Sorry, the customer did not leave a valid phone number: " + customer.phone);
      return;
    }
    
    let payload = {
      phone: customer.phone,
      text: `Hello ${customer.name}, your table for ${customer.party} is almost ready. Please be ready for your name to be called in 15 mins.`
    }
    this._LRService.sendSMS(customer._id, payload);
  }

  getStyleClass(customer) {
    if (customer.served) {
      return "strike-through";
    }
    else {
      return "";
    }
  }
}
