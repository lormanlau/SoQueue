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
  customer = true;

  constructor(private _LRService: LoginregService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {

  }

}
