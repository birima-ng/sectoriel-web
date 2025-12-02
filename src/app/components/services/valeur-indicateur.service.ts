import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ValeurIndicateur} from "../modeles/valeur-indicateur.modele";
@Injectable({
providedIn: 'root'
})
export class ValeurIndicateurService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getValeurIndicateurById(id: string): Observable<ValeurIndicateur> {
    return this.http.get<ValeurIndicateur>(this.baseUrl +'api/valeur-indicateur/'+ id);
  }

  createValeurIndicateur(valeurindicateur: ValeurIndicateur): Observable<ValeurIndicateur> {
    return this.http.post<ValeurIndicateur>(this.baseUrl+'api/valeur-indicateur', valeurindicateur);
  }

  updateValeurIndicateur(valeurindicateur: ValeurIndicateur): Observable<ValeurIndicateur> {
    return this.http.put<ValeurIndicateur>(this.baseUrl +'api/valeur-indicateur/'+ valeurindicateur.id, valeurindicateur);
  }

  deleteValeurIndicateur(id: string): Observable<ValeurIndicateur> {
    return this.http.delete<ValeurIndicateur>(this.baseUrl +'api/valeur-indicateur/'+ id);
  }

  getValeurIndicateurs() {
      return this.http.get<any>(this.baseUrl+'api/valeur-indicateur').pipe(
       map(
         valeurindicateurData => {
          return valeurindicateurData;
         }));
  }

  getValeurIndicateurPages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/valeur-indicateur-page?page='+page+'&size='+size);
  }

  getValeurIndicateurSearch(indicateurId: string, periode: string, campagneagricoleId: string, paysId: string): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/valeur-indicateur/indicateur/'+indicateurId+'/periode/'+periode+'/campagneagricole/'+campagneagricoleId+'/pays/'+paysId);
  }

  getValeurIndicateurPeriodeSearch(indicateurId: string, periode: string): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/valeur-indicateur/indicateur/'+indicateurId+'/periode/'+periode);
  }

}
