import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Indicateur} from "../modeles/indicateur.modele";
@Injectable({
providedIn: 'root'
})
export class IndicateurService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getIndicateurById(id: string): Observable<Indicateur> {
    return this.http.get<Indicateur>(this.baseUrl +'api/indicateur/'+ id);
  }

  createIndicateur(indicateur: Indicateur): Observable<Indicateur> {
    return this.http.post<Indicateur>(this.baseUrl+'api/indicateur', indicateur);
  }

  updateIndicateur(indicateur: Indicateur): Observable<Indicateur> {
    return this.http.put<Indicateur>(this.baseUrl +'api/indicateur/'+ indicateur.id, indicateur);
  }

  deleteIndicateur(id: string): Observable<Indicateur> {
    return this.http.delete<Indicateur>(this.baseUrl +'api/indicateur/'+ id);
  }

  getIndicateurs() {
      return this.http.get<any>(this.baseUrl+'api/indicateur').pipe(
       map(
         indicateurData => {
          return indicateurData;
         }));
  }

  getIndicateurPages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/indicateur-page?page='+page+'&size='+size);
  }
}
