import { Component, OnInit, Input } from '@angular/core';
import { LoginregService } from './../loginreg.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [LoginregService]
})

export class DashboardComponent implements OnInit {

  constructor(private _LRService: LoginregService,
    private _route: ActivatedRoute) { }

  @Input()
  customer: Boolean;
  companyId: String;
  company: Boolean = false;

  getCustomer(){
    return this.customer || false;
  }


  ngOnInit() { 
    this._route.params.subscribe(params => {
       this.companyId = params['id'];
       this.company = false;
    });
    if (!this.companyId){
      this.companyId = localStorage.getItem('companyId')
      this.company = true
    }
    this.clear();
    this.getCustomers();
	}

  newCustomer: {}

  customers: any[] = []

  addCustomer() {
  	this._LRService.addCustomer(this.newCustomer, this.companyId).then(res => {
      this.clear();
      this.getCustomers();
    });
  	
  }

  clear() {
  	this.newCustomer = {
	  	name: undefined,
	  	phone: undefined,
	  	party: undefined,
      companyId: this.companyId
	  };
  }

  getCustomers() {
  	this._LRService.getCompanyCustomers(this.companyId)
    .then(res => {
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

  search(values){
    this._LRService.search(values, this.companyId)
    .then(data => {
      console.log(data.json());
      this.customers = data.json();
    })

  }

  logout(){
    this.company = false;
    localStorage.clear()
  }
}
