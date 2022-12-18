import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private http:HttpClient
  ) {}


  connexion(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'region/ajout_region_habitant', {
      username,
      password
    }, httpOptions);
  }

  
}
