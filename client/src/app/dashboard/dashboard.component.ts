import { Component, OnInit, Input } from '@angular/core';
import { LoginregService } from './../loginreg.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginregService]
})

export class DashboardComponent implements OnInit {

  constructor(private _LRService: LoginregService) { }

  @Input()
  customer: Boolean;

  getCustomer(){
    return this.customer || false;
  }


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
      text: `Hello ${customer.name}, your table for ${customer.party} is almost ready. Please respond with 'confirm' or 'cancel' in the next 5 minutes or you will forfeit your table.`
    }
    this._LRService.sendSMS(customer._id, payload).then(res => {
      let data = res.json();

      setTimeout(() => {
        console.log("Customer expired");
        this._LRService.customerExpired(customer);
      }, 30000); // 30 sec
    });
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
