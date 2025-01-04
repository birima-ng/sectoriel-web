import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Commune} from 'app/components/modeles/commune.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class CommuneService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getCommuneById(id: string): Observable<Commune> {
    return this.http.get<Commune>(this.baseUrl +'api/commune/'+ id);
  }

  createCommune(commune: Commune): Observable<Commune> {
    return this.http.post<Commune>(this.baseUrl+'api/commune', commune);
  }

  updateCommune(commune: Commune): Observable<Commune> {
    return this.http.put<Commune>(this.baseUrl +'api/commune/'+ commune.id, commune);
  }

  deleteCommune(id: string): Observable<Commune> {
    return this.http.delete<Commune>(this.baseUrl +'api/commune/'+ id);
  }

  getCommunes() {
      return this.http.get<any>(this.baseUrl+'api/commune').pipe(
       map(
         communeData => {
          return communeData;
         }));
  }

  getCommunesByDepartement(id: string) {
      return this.http.get<any>(this.baseUrl+'api/commune/'+id+'/departement').pipe(
       map(
         communeData => {
          return communeData;
         }));
  }
}
