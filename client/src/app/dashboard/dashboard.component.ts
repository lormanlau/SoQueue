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

  ngOnInit() { this.clear(); }

  newCustomer: {}

  addCustomer() {
  	this._LRService.addCustomer(this.newCustomer);
  	this.clear();
  }

  clear() {
  	this.newCustomer = {
	  	name: undefined,
	  	phone: undefined,
	  	party: undefined,
	  };
  }

  // TODO: test data
  customers: any[] = [{
  	name: "Rosemary",
  	phone: 14088278178,
  	party: 4,
  	id: 0
  },
  {
  	name: "Lucy",
  	phone: 14088278178,
  	party: 3,
  	id: 1
  }]

  removeCustomer(event, userId) {
  	let element = event.target;
  	element.closest('tr').classList.add("strike-through");
  	this._LRService.removeCustomer(userId);
  }
}
