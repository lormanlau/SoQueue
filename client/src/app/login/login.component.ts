import { Component, OnInit } from '@angular/core';
import { LoginregService } from './../loginreg.service';
import { Router } from '@angular/router';

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
  
  error;

  constructor(
    private _LRService: LoginregService,
    private _router: Router
    ) { }

  login() {
     this._LRService.loginUser(this.user)
     .then(res => {
       this._router.navigate(['/dashboard'])
     })
     .catch(res => {
       this.error = JSON.parse(res._body)
     })
  }


  ngOnInit() {
  }

}
