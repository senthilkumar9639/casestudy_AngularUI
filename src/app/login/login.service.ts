import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginurl = "http://localhost:8082/login";

  constructor(private http: HttpClient) {

  }
  checkLogin(name: String, pwd: String): Observable<any> {
    var data = { userName: name, userPwd: pwd };
    return this.http.post<any>(this.loginurl, data);
  }
}
