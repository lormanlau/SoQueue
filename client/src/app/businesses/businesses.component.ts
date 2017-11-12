import { Component, OnInit } from '@angular/core';
import { LoginregService } from './../loginreg.service';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css'],
  providers: [LoginregService]
})
export class BusinessesComponent implements OnInit {

  constructor(private _LRService: LoginregService) { }

  businesses: any[] = []
  ngOnInit() {
    this.getBusiness();
  }

  getBusiness() {
  	this._LRService.getAllBusinesses()
    .then(res => {
      console.log(res)
  		this.businesses = res.json();
  		}
  	);
  }
}
