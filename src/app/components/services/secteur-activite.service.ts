import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {GenreVehicule} from "../modeles/genre-vehicule.modele";
import {SecteurActivite} from "../modeles/secteur-activite.modele";
@Injectable({
providedIn: 'root'
})
export class SecteurActiviteService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getSecteurActiviteById(id: string): Observable<SecteurActivite> {
    return this.http.get<SecteurActivite>(this.baseUrl +'api/secteur-activite/'+ id);
  }

  createSecteurActivite(secteuractivite: SecteurActivite): Observable<SecteurActivite> {
    return this.http.post<SecteurActivite>(this.baseUrl+'api/secteur-activite', secteuractivite);
  }

  updateSecteurActivite(secteuractivite: SecteurActivite): Observable<SecteurActivite> {
    return this.http.put<SecteurActivite>(this.baseUrl +'api/secteur-activite/'+ secteuractivite.id, secteuractivite);
  }

  deleteSecteurActivite(id: string): Observable<SecteurActivite> {
    return this.http.delete<SecteurActivite>(this.baseUrl +'api/secteur-activite/'+ id);
  }

  getSecteurActivites() {
      return this.http.get<any>(this.baseUrl+'api/secteur-activite').pipe(
       map(
         secteuractiviteData => {
          return secteuractiviteData;
         }));
  }
}
