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
	  };
  }

  getCustomers() {
  	this._LRService.getCompanyCustomers().then(
  		res => {
  			this.customers = res.json();
  		}
  	);
  }

  removeCustomer(event, userId) {
  	let element = event.target;
  	element.closest('tr').classList.add("strike-through");
  	this._LRService.removeCustomer(userId);
  }
}
