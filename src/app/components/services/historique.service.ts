import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Historique} from 'app/components/modeles/historique.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class HistoriqueService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getHistoriqueById(id: string): Observable<Historique> {
    return this.http.get<Historique>(this.baseUrl +'api/historique/'+ id);
  }

  createHistorique(historique: Historique): Observable<Historique> {
    return this.http.post<Historique>(this.baseUrl+'api/historique', historique);
  }

  updateHistorique(historique: Historique): Observable<Historique> {
    return this.http.put<Historique>(this.baseUrl +'api/historique/'+ historique.id, historique);
  }

  deleteHistorique(id: string): Observable<Historique> {
    return this.http.delete<Historique>(this.baseUrl +'api/historique/'+ id);
  }

  getHistoriques() {
      return this.http.get<any>(this.baseUrl+'api/historique').pipe(
       map(
         historiqueData => {
          return historiqueData;
         }));
  }

  getHistoriqueBaacs(id: string) {
      return this.http.get<any>(this.baseUrl+'api/historique/'+id+'/baac').pipe(
       map(
         historiqueData => {
          return historiqueData;
         }));
  }

  getHistoriqueUsers(id: string) {
      return this.http.get<any>(this.baseUrl+'api/historique/'+id+'/user').pipe(
       map(
         historiqueData => {
          return historiqueData;
         }));
  }

}
