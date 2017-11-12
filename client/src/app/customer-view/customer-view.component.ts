import { Component, OnInit } from '@angular/core';
import { LoginregService } from './../loginreg.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css'],
  providers: [LoginregService]
})
export class CustomerViewComponent implements OnInit {
  hidden: Boolean;
  customer = true;
  newCustomer = {};
  constructor(private _LRService: LoginregService) { }

  ngOnInit() {
    this.hidden = false;
  }

  addCustomer() {
    let companyId = localStorage.getItem('companyId');
    this.hidden = true;
    this._LRService.addCustomer(this.newCustomer, companyId);
  }
}
