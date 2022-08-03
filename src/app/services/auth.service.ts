import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://tapntake.herokuapp.com/api/auth/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  login(name: string, password: string): Observable<any>{
    return this.http.post(AUTH_API+'signin', {
      name,
      password
    }, httpOptions)
  }

  register(name: string, email: string, password: string, img: string): Observable<any>{
    return this.http.post(AUTH_API+'signup', {
      name,
      email,
      password,
      img
    }, httpOptions)
  }
  
}
