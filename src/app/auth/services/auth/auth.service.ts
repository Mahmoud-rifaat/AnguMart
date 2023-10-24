import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userData: any;
  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem("token"))
      this.userData = jwtDecode(localStorage.getItem("token") || '')
  }

  signUp(data: any): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data);
  }

  signIn(data: any): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data);
  }
  logOut() {
    this.isLogin.next(false);
  }
}