import { Component, OnInit } from '@angular/core';
import { LoginregService } from './../loginreg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginregService]
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    password: ""
  }
  constructor(private _LRService: LoginregService) { }

  login() {
    this._LRService.loginUser(this.user);
  }


  ngOnInit() {
  }

}
