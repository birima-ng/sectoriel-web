import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ConfigFicheCollecte} from "../modeles/config-fiche-collecte.modele";
@Injectable({
providedIn: 'root'
})
export class ConfigFicheCollecteService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getConfigFicheCollecteById(id: string): Observable<ConfigFicheCollecte> {
    return this.http.get<ConfigFicheCollecte>(this.baseUrl +'api/config-fiche-collecte/'+ id);
  }

  createConfigFicheCollecte(configfichecollecte: ConfigFicheCollecte): Observable<ConfigFicheCollecte> {
    return this.http.post<ConfigFicheCollecte>(this.baseUrl+'api/config-fiche-collecte', configfichecollecte);
  }

  updateConfigFicheCollecte(configfichecollecte: ConfigFicheCollecte): Observable<ConfigFicheCollecte> {
    return this.http.put<ConfigFicheCollecte>(this.baseUrl +'api/config-fiche-collecte/'+ configfichecollecte.id, configfichecollecte);
  }

  deleteConfigFicheCollecte(id: string): Observable<ConfigFicheCollecte> {
    return this.http.delete<ConfigFicheCollecte>(this.baseUrl +'api/config-fiche-collecte/'+ id);
  }

  getConfigFicheCollectes() {
      return this.http.get<any>(this.baseUrl+'api/config-fiche-collecte').pipe(
       map(
         configfichecollecteData => {
          return configfichecollecteData;
         }));
  }

  getConfigFicheCollectePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/config-fiche-collecte-page?page='+page+'&size='+size);
  }

  getConfigFicheCollecteTypeFichePages(id: string, page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/config-fiche-collecte-page/'+id+'/type-fiche-collecte?page='+page+'&size='+size);
  }
}
