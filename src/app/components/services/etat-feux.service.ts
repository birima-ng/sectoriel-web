import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {GenreVehicule} from "../modeles/genre-vehicule.modele";
import {EtatFeux} from "../modeles/etat-feux.modele";
@Injectable({
providedIn: 'root'
})
export class EtatFeuxService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getEtatFeuxById(id: string): Observable<EtatFeux> {
    return this.http.get<EtatFeux>(this.baseUrl +'api/etat-feux/'+ id);
  }

  createEtatFeux(etatfeux: EtatFeux): Observable<EtatFeux> {
    return this.http.post<EtatFeux>(this.baseUrl+'api/etat-feux', etatfeux);
  }

  updateEtatFeux(etatfeux: EtatFeux): Observable<EtatFeux> {
    return this.http.put<EtatFeux>(this.baseUrl +'api/etat-feux/'+ etatfeux.id, etatfeux);
  }

  deleteEtatFeux(id: string): Observable<EtatFeux> {
    return this.http.delete<EtatFeux>(this.baseUrl +'api/etat-feux/'+ id);
  }

  getEtatFeuxs() {
      return this.http.get<any>(this.baseUrl+'api/etat-feux').pipe(
       map(
         etatfeuxData => {
          return etatfeuxData;
         }));
  }
}
