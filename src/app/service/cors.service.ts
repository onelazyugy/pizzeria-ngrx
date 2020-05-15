import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorsService {

  constructor(private http: HttpClient) { }

  fetchUserDetials(): Observable<string> {
    return this.http.get<string>('http://localhost:8282/pizzeria/api/v1/user/whoami?name=vietle');
  }

  fetchPizzaDetails():  Observable<string> {
    return this.http.get<string>('http://localhost:8282/pizzeria/api/v1/pizza/details');
  }
}
