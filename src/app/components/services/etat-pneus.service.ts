import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {EtatGeneral} from "../modeles/etat-general.modele";
import {EtatPneus} from "../modeles/etat-pneus.modele";
@Injectable({
providedIn: 'root'
})
export class EtatPneusService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getEtatPneusById(id: string): Observable<EtatPneus> {
    return this.http.get<EtatPneus>(this.baseUrl +'api/etat-pneus/'+ id);
  }

  createEtatPneus(etatPneus: EtatPneus): Observable<EtatPneus> {
    return this.http.post<EtatPneus>(this.baseUrl+'api/etat-pneus', etatPneus);
  }

  updateEtatPneus(etatPneus: EtatPneus): Observable<EtatPneus> {
    return this.http.put<EtatPneus>(this.baseUrl +'api/etat-pneus/'+ etatPneus.id, etatPneus);
  }

  deleteEtatPneus(id: string): Observable<EtatPneus> {
    return this.http.delete<EtatGeneral>(this.baseUrl +'api/etat-pneus/'+ id);
  }

  geEtatEtatPneuss() {
      return this.http.get<any>(this.baseUrl+'api/etat-pneus').pipe(
       map(
         etatPneusData => {
          return etatPneusData;
         }));
  }
}
