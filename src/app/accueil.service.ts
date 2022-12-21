import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/api/region/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccueilService {

  constructor(
    private http: HttpClient
  ) { }

  recupererRegions(): Observable<any> {
    return this.http.get(AUTH_API + 'liste_regions');
  }

}
