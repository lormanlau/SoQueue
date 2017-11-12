import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  hidden: Boolean;
  constructor() { }

  ngOnInit() {
    this.hidden = false;
  }

  addCustomer() {
    this.hidden = true
  }
}
