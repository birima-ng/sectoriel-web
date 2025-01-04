import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {EtatChaussee} from "../modeles/etat-chaussee.modele";
@Injectable({
providedIn: 'root'
})
export class EtatChausseeService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getEtatChausseeById(id: string): Observable<EtatChaussee> {
    return this.http.get<EtatChaussee>(this.baseUrl +'api/etat-chaussee/'+ id);
  }

  createEtatChaussee(etatchaussee: EtatChaussee): Observable<EtatChaussee> {
    return this.http.post<EtatChaussee>(this.baseUrl+'api/etat-chaussee', etatchaussee);
  }

  updateEtatChaussee(etatchaussee: EtatChaussee): Observable<EtatChaussee> {
    return this.http.put<EtatChaussee>(this.baseUrl +'api/etat-chaussee/'+ etatchaussee.id, etatchaussee);
  }

  deleteEtatChaussee(id: string): Observable<EtatChaussee> {
    return this.http.delete<EtatChaussee>(this.baseUrl +'api/etat-chaussee/'+ id);
  }

  geEtatChaussees() {
      return this.http.get<any>(this.baseUrl+'api/etat-chaussee').pipe(
       map(
         etatchausseeData => {
          return etatchausseeData;
         }));
  }
}
