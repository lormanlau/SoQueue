import { Component, OnInit } from '@angular/core';
import { LoginregService } from './../loginreg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    password: ""
  }
  constructor(private _LRService: LoginregService) { }

  login() {
    this._LRService.login(this.user);
  }


  ngOnInit() {
  }

}
