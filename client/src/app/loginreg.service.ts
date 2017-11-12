import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class LoginregService {
  constructor(private _http: Http) { }

  loginUser(user) {
    return this._http.post('company/login', user)
    .map(res => {
        let data = res.json();
        localStorage.setItem('companyId', data._id)
    })
    .toPromise();
  }

  registerUser(user) {
    return this._http.post('company/register', user, {withCredentials: true})
    .map(res => {
      let data = res.json();
      localStorage.setItem('companyId', data._id);
    })
    .toPromise();
  }

  removeCustomer(customerId) {
    let companyId = localStorage.getItem('companyId');
    return this._http.delete(`company/${companyId}/customer/${customerId}`)
        .toPromise();
  }

  addCustomer(customer) {
    let companyId = localStorage.getItem('companyId');
    return this._http.post(`company/${companyId}/customer`, customer)
        .toPromise();
  }

  getCompanyCustomers() {
    let companyId = localStorage.getItem('companyId');
    return this._http.get(`company/${companyId}/customer`)
        .toPromise();
  }
}
