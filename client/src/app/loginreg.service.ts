import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class LoginregService {
  constructor(private _http: Http) { }

  loginUser(user) {
    return this._http.post('company/login', user)
    .map(data => data.json())
    .toPromise();
  }

  registerUser(user) {
    return this._http.post('company/register', user)
    .map(data => data.json())
    .toPromise();
  }

  removeCustomer(userId) {
    console.log("removing");
    return this._http.delete(`company/customer/${userId}`)
        .toPromise();
  }
}
