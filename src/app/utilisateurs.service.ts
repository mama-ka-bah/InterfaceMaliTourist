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
export class UtilisateursService {



  constructor(private http:HttpClient) { }

  // inscription(username: string, password: string){
  //   var user = { 
  //     user: username, //scalar value 
  //     pass: password,   
  //     role:["user"]  
  //  };

  //   return this.http.post<any>(`http://localhost:8080/api/auth/signup`, user);
  // }

  connexion(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }


  inscription(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

}

