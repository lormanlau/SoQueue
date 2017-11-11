import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class LoginregService {
  constructor(private _http: Http) { }

  login(user){
    return this._http.post('company/login', user)
    .map(data => data.json())
    .toPromise();
  }
}
