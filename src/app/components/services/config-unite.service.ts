import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ConfigUnite} from "../modeles/config-unite.modele";
import {CollecteDTO} from "../modeles/collecte-dto.modele";
@Injectable({
providedIn: 'root'
})
export class ConfigUniteService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getConfigUniteById(id: string): Observable<ConfigUnite> {
    return this.http.get<ConfigUnite>(this.baseUrl +'api/config-unite/'+ id);
  }

  createConfigUnite(configunite: ConfigUnite): Observable<ConfigUnite> {
    return this.http.post<ConfigUnite>(this.baseUrl+'api/config-unite', configunite);
  }

  updateConfigUnite(configunite: ConfigUnite): Observable<ConfigUnite> {
    return this.http.put<ConfigUnite>(this.baseUrl +'api/config-unite/'+ configunite.id, configunite);
  }

  deleteConfigUnite(id: string): Observable<ConfigUnite> {
    return this.http.delete<ConfigUnite>(this.baseUrl +'api/config-unite/'+ id);
  }

  getConfigUnites() {
      return this.http.get<any>(this.baseUrl+'api/config-unite').pipe(
       map(
         configuniteData => {
          return configuniteData;
         }));
  }

  getConfigUniteStadecommerceId(id: string): Observable<ConfigUnite[]>  {
      return this.http.get<any>(this.baseUrl+'api/config-unite/'+id+'/stade-commerce').pipe(
       map(
         configuniteData => {
          return configuniteData;
         }));
  }

  getConfigUniteStadecommerceIdAndTypeProduit(id: string, idtypeproduit: string): Observable<ConfigUnite[]>  {
      return this.http.get<any>(this.baseUrl+'api/config-unite/'+id+'/stade-commerce/'+idtypeproduit+'/typeproduit').pipe(
       map(
         configuniteData => {
          return configuniteData;
         }));
  }

}
