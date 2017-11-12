import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class LoginregService {
  constructor(private _http: Http) { }

  companyId: Number = 0

  loginUser(user) {
    return this._http.post('company/login', user)
    .map(res => {
      let data = res.json();
      this.companyId = data.id;

    })
    .toPromise();
  }

  registerUser(user) {
    return this._http.post('company/register', user)
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
