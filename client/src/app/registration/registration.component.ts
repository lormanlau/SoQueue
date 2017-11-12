import { Component, OnInit } from '@angular/core';
import { LoginregService } from './../loginreg.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [LoginregService]
})
export class RegistrationComponent implements OnInit {
  user = {
    email: "",
    company: "",
    password: ""
  }
  constructor(private _LRService: LoginregService) { }

  register() {
    this._LRService.registerUser(this.user)
  }

  ngOnInit() {
  }

}
