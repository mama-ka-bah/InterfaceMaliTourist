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
export class RegionService {

  constructor(
    private http:HttpClient
  ) {}


  ajouter(file:any, region:any, habitantAnnee:any): Observable<any> {
    const data:FormData=new FormData();
    data.append("file", file);
    data.append('region', JSON.stringify(region).slice(1,JSON.stringify(region).lastIndexOf(']')));
    data.append('habitantAnnee', JSON.stringify(habitantAnnee).slice(1,JSON.stringify(habitantAnnee).lastIndexOf(']')));
     //console.log("###############: " + httpOptions.headers.getAll)
    return this.http.post(AUTH_API + 'ajout_region_habitant', data);
  }

  recupererRegions(): Observable<any> {
    return this.http.get(AUTH_API + 'liste_regions');
  }
  
  recupererDetailRegions(id:number): Observable<any> {
    return this.http.get(AUTH_API + `detailregion/${id}`);
  }

  modifierRegion(file:any, region:any): Observable<any> {
    const data:FormData=new FormData();
    data.append("file", file);
    data.append('region', JSON.stringify(region).slice(1,JSON.stringify(region).lastIndexOf(']')));
    return this.http.put(AUTH_API + 'modifier_region', data);
  }

  supprimerRegions(id:number): Observable<any> {
    return this.http.delete(AUTH_API + `supprimer_region/${id}`);
  }

  regionsFavorit(): Observable<any> {
    return this.http.get(AUTH_API + 'favouriteRegions');
  }

}
