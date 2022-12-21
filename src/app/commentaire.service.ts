import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/api/commentaire/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(
    private http:HttpClient
  ) { }

  ajouterComentaireAregion(commentaire:any){
    const data:FormData=new FormData();
    data.append('commentaire', JSON.stringify(commentaire).slice(1,JSON.stringify(commentaire).lastIndexOf(']')));
    return this.http.post(AUTH_API + 'ajouter', data);
  }

  recuperCommentairesRegions(regionId:any){
    //const data:FormData=new FormData();
   // data.append('commentaire', JSON.stringify(commentaire).slice(1,JSON.stringify(commentaire).lastIndexOf(']')));
    return this.http.get(AUTH_API + `recuperCommentairesRegion/${regionId}`);
  }

}
