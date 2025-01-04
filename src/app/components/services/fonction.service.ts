import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Fonction} from "../modeles/fonction.modele";
@Injectable({
providedIn: 'root'
})
export class FonctionService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getFonctionById(id: string): Observable<Fonction> {
    return this.http.get<Fonction>(this.baseUrl +'api/fonction/'+ id);
  }

  createFonction(fonction: Fonction): Observable<Fonction> {
    return this.http.post<Fonction>(this.baseUrl+'api/fonction', fonction);
  }

  updateFonction(fonction: Fonction): Observable<Fonction> {
    return this.http.put<Fonction>(this.baseUrl +'api/fonction/'+ fonction.id, fonction);
  }

  deleteFonction(id: string): Observable<Fonction> {
    return this.http.delete<Fonction>(this.baseUrl +'api/fonction/'+ id);
  }

  getFonctions() {
      return this.http.get<any>(this.baseUrl+'api/fonction').pipe(
       map(
         fonctionData => {
          return fonctionData;
         }));
  }
}
