import { Component, OnInit } from '@angular/core';
import { LoginregService } from './../loginreg.service';
import { ActivatedRoute } from '@angular/router';

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
  companyId: String;

  constructor(private _LRService: LoginregService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.hidden = false;
    this.getCompanyId()
  }

  getCompanyId(){
    this._route.params.subscribe(params => {
       this.companyId = params['id'];
       
    });
  }

  addCustomer() {
    let companyId = localStorage.getItem('companyId');
    this.hidden = true;
    this._LRService.addCustomer(this.newCustomer, this.companyId);
  }
}
