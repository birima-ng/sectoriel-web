import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {EtatGeneral} from "../modeles/etat-general.modele";
@Injectable({
providedIn: 'root'
})
export class EtatGeneralService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getEtatGeneralById(id: string): Observable<EtatGeneral> {
    return this.http.get<EtatGeneral>(this.baseUrl +'api/etat-general/'+ id);
  }

  createEtatGeneral(etatgeneral: EtatGeneral): Observable<EtatGeneral> {
    return this.http.post<EtatGeneral>(this.baseUrl+'api/etat-general', etatgeneral);
  }

  updateEtatGeneral(etatgeneral: EtatGeneral): Observable<EtatGeneral> {
    return this.http.put<EtatGeneral>(this.baseUrl +'api/etat-general/'+ etatgeneral.id, etatgeneral);
  }

  deleteEtatGeneral(id: string): Observable<EtatGeneral> {
    return this.http.delete<EtatGeneral>(this.baseUrl +'api/etat-general/'+ id);
  }

  geEtatGenerals() {
      return this.http.get<any>(this.baseUrl+'api/etat-general').pipe(
       map(
         etatgeneralData => {
          return etatgeneralData;
         }));
  }
}
