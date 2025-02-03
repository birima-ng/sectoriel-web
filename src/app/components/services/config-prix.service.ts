import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ConfigPrix} from "../modeles/config-prix.modele";
import {ConfigPrixDTO} from "../modeles/config-prix-dto.modele";
@Injectable({
providedIn: 'root'
})
export class ConfigPrixService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getConfigPrixById(id: string): Observable<ConfigPrix> {
    return this.http.get<ConfigPrix>(this.baseUrl +'api/config-prix/'+ id);
  }

  createConfigPrix(configprix: ConfigPrix): Observable<ConfigPrix> {
    return this.http.post<ConfigPrix>(this.baseUrl+'api/config-prix', configprix);
  }

  updateConfigPrix(configprix: ConfigPrix): Observable<ConfigPrix> {
    return this.http.put<ConfigPrix>(this.baseUrl +'api/config-prix/'+ configprix.id, configprix);
  }

  deleteConfigPrix(id: string): Observable<ConfigPrix> {
    return this.http.delete<ConfigPrix>(this.baseUrl +'api/config-prix/'+ id);
  }

  getConfigPrixs() {
      return this.http.get<any>(this.baseUrl+'api/config-prix').pipe(
       map(
         configprixData => {
          return configprixData;
         }));
  }

  getConfigPrixProduitId(id: string): Observable<ConfigPrix[]>  {
      return this.http.get<any>(this.baseUrl+'api/config-prix/'+id+'/produit').pipe(
       map(
         configprixData => {
          return configprixData;
         }));
  }

  getConfigPrixByEntete(id: string): Observable<ConfigPrixDTO>  {
      return this.http.get<any>(this.baseUrl+'api/config-prix/'+id+'/entete-config-prix-dto').pipe(
       map(
         configprixData => {
          return configprixData;
         }));
  }

}
