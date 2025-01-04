import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {EtatCourrier} from "../modeles/etat-courrier.modele";
@Injectable({
providedIn: 'root'
})
export class EtatCourrierService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getEtatCourrierById(id: string): Observable<EtatCourrier> {
    return this.http.get<EtatCourrier>(this.baseUrl +'api/etat-courrier/'+ id);
  }

  createEtatCourrier(etatcourrier: EtatCourrier): Observable<EtatCourrier> {
    return this.http.post<EtatCourrier>(this.baseUrl+'api/etat-courrier', etatcourrier);
  }

  updateEtatCourrier(etatcourrier: EtatCourrier): Observable<EtatCourrier> {
    return this.http.put<EtatCourrier>(this.baseUrl +'api/etat-courrier/'+ etatcourrier.id, etatcourrier);
  }

  deleteEtatCourrier(id: string): Observable<EtatCourrier> {
    return this.http.delete<EtatCourrier>(this.baseUrl +'api/etat-courrier/'+ id);
  }

  geEtatCourriers() {
      return this.http.get<any>(this.baseUrl+'api/etat-courrier').pipe(
       map(
         etatcourrierData => {
          return etatcourrierData;
         }));
  }
}
