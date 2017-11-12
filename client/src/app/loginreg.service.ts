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

  customerExpired(customer) {
    let companyId = localStorage.getItem('companyId');
    return this._http.delete(`company/${companyId}/customer/${customer._id}?phone=${customer.phone}`)
        .toPromise();
  }

  addCustomer(customer, companyId) {
    // let companyId = localStorage.getItem('companyId');
    return this._http.post(`company/${companyId}/customer`, customer)
        .toPromise();
  }

  getCompanyCustomers(companyId: String) {
    // let companyId = localStorage.getItem('companyId');
    return this._http.get(`company/${companyId}/customer`)
        .toPromise();
  }

  sendSMS(id, payload) {
    let companyId = localStorage.getItem('companyId');
    return this._http.post(`company/${companyId}/customer/${id}/sms`, payload)
        .toPromise();
  }

  getAllBusinesses() {
    return this._http.get('company')
    .toPromise();
  }

  search(values: object, companyId) {
    var url = ""
    for (var keys in values){
      if (values[keys] != undefined) {
        url += keys + "=" + values[keys] + "&"
      }
    }
    console.log(url)
    return this._http.get(`/company/${companyId}/search?` + url)
      .toPromise()

  }
}
