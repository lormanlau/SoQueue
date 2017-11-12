import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs';

@Injectable()
export class LoginregService {
  constructor(
    private _http: Http, 
    private _router: Router) { }

  loginUser(user) {
    return this._http.post('company/login', user)
    .map(res => {
        let data = res.json();
        localStorage.setItem('companyId', data._body)
    })
    .toPromise();
  }

  registerUser(user) {
    return this._http.post('company/register', user, {withCredentials: true})
    .map(data => data.json())
    .toPromise();
  }

  removeCustomer(customerId) {
    return this._http.delete(`company/${this.companyId}/customer/${customerId}`)
        .toPromise();
  }

  addCustomer(customer) {
    return this._http.post(`company/${this.companyId}/customer`, customer)
        .toPromise();
  }

  getCompanyCustomers() {
    return this._http.get(`company/${this.companyId}/customer`)
        .toPromise();
  }
}
