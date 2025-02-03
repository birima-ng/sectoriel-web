import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {EnteteConfigPrix} from "../modeles/entete-config-prix.modele";
@Injectable({
providedIn: 'root'
})
export class EnteteConfigPrixService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getEnteteConfigPrixById(id: string): Observable<EnteteConfigPrix> {
    return this.http.get<EnteteConfigPrix>(this.baseUrl +'api/entete-config-prix/'+ id);
  }

  createEnteteConfigPrix(enteteconfigprix: EnteteConfigPrix): Observable<EnteteConfigPrix> {
    return this.http.post<EnteteConfigPrix>(this.baseUrl+'api/entete-config-prix', enteteconfigprix);
  }

  updateEnteteConfigPrix(enteteconfigprix: EnteteConfigPrix): Observable<EnteteConfigPrix> {
    return this.http.put<EnteteConfigPrix>(this.baseUrl +'api/entete-config-prix/'+ enteteconfigprix.id, enteteconfigprix);
  }

  deleteEnteteConfigPrix(id: string): Observable<EnteteConfigPrix> {
    return this.http.delete<EnteteConfigPrix>(this.baseUrl +'api/entete-config-prix/'+ id);
  }

  getEnteteConfigPrixs() {
      return this.http.get<any>(this.baseUrl+'api/entete-config-prix').pipe(
       map(
         enteteconfigprixData => {
          return enteteconfigprixData;
         }));
  }
}
