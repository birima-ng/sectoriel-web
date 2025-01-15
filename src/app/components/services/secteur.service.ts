import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {GenreVehicule} from "../modeles/genre-vehicule.modele";
import {Secteur} from "../modeles/secteur.modele";
@Injectable({
providedIn: 'root'
})
export class SecteurService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getSecteurById(id: string): Observable<Secteur> {
    return this.http.get<Secteur>(this.baseUrl +'api/secteur/'+ id);
  }

  createSecteur(secteur: Secteur): Observable<Secteur> {
    return this.http.post<Secteur>(this.baseUrl+'api/secteur', secteur);
  }

  updateSecteur(secteur: Secteur): Observable<Secteur> {
    return this.http.put<Secteur>(this.baseUrl +'api/secteur/'+ secteur.id, secteur);
  }

  deleteSecteur(id: string): Observable<Secteur> {
    return this.http.delete<Secteur>(this.baseUrl +'api/secteur/'+ id);
  }

  getSecteurs() {
      return this.http.get<any>(this.baseUrl+'api/secteur').pipe(
       map(
         secteurData => {
          return secteurData;
         }));
  }
}
