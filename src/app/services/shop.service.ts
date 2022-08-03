import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from '../shop';

const baseUrl = 'https://tapntake.herokuapp.com/api/shops'

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  accessToken = window.sessionStorage.getItem("auth-token")
  httpOptions = {
    headers: new HttpHeaders({'x-access-token': `${this.accessToken}`})
  };
  constructor( private http: HttpClient ) { }

  getAll(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${baseUrl}`, this.httpOptions)
  }
  get(id: any): Observable<Shop> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: Shop): Observable<Shop> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(name: any): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${baseUrl}?name=${name}`);
  }

}
