import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {SecteurActiviteEntreprise} from 'app/components/modeles/secteur-activite-entreprise.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class SecteurActiviteEntrepriseService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getSecteurActiviteEntrepriseById(id: string): Observable<SecteurActiviteEntreprise> {
    return this.http.get<SecteurActiviteEntreprise>(this.baseUrl +'api/secteur-activite-entreprise/'+ id);
  }

  createSecteurActiviteEntreprise(secteuractiviteentreprise: SecteurActiviteEntreprise): Observable<SecteurActiviteEntreprise> {
    return this.http.post<SecteurActiviteEntreprise>(this.baseUrl+'api/secteur-activite-entreprise', secteuractiviteentreprise);
  }

  updateSecteurActiviteEntreprise(secteuractiviteentreprise: SecteurActiviteEntreprise): Observable<SecteurActiviteEntreprise> {
    return this.http.put<SecteurActiviteEntreprise>(this.baseUrl +'api/secteur-activite-entreprise/'+ secteuractiviteentreprise.id, secteuractiviteentreprise);
  }

  deleteSecteurActiviteEntreprise(id: string): Observable<SecteurActiviteEntreprise> {
    return this.http.delete<SecteurActiviteEntreprise>(this.baseUrl +'api/secteur-activite-entreprise/'+ id);
  }

  getSecteurActiviteEntreprises() {
      return this.http.get<any>(this.baseUrl+'api/secteur-activite-entreprise').pipe(
       map(
         secteuractiviteentrepriseData => {
          return secteuractiviteentrepriseData;
         }));
  }

  getSecteurActiviteEntreprisesByEntreprise(id: string) {
      return this.http.get<any>(this.baseUrl+'api/secteur-activite-entreprise/'+id+'/entreprise').pipe(
       map(
         secteuractiviteentrepriseData => {
          return secteuractiviteentrepriseData;
         }));
  }
}
