import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {UniteOrganisationnelle} from 'app/components/modeles/unite-organisationnelle.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class UniteOrganisationnelleService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getUniteOrganisationnelleById(id: string): Observable<UniteOrganisationnelle> {
    return this.http.get<UniteOrganisationnelle>(this.baseUrl +'api/unite-organisationnelle/'+ id);
  }

  createUniteOrganisationnelle(uniteorganisationnelle: UniteOrganisationnelle): Observable<UniteOrganisationnelle> {
    return this.http.post<UniteOrganisationnelle>(this.baseUrl+'api/unite-organisationnelle', uniteorganisationnelle);
  }

  updateUniteOrganisationnelle(uniteorganisationnelle: UniteOrganisationnelle): Observable<UniteOrganisationnelle> {
    return this.http.put<UniteOrganisationnelle>(this.baseUrl +'api/unite-organisationnelle/'+ uniteorganisationnelle.id, uniteorganisationnelle);
  }

  deleteUniteOrganisationnelle(id: string): Observable<UniteOrganisationnelle> {
    return this.http.delete<UniteOrganisationnelle>(this.baseUrl +'api/unite-organisationnelle/'+ id);
  }

  getUniteOrganisationnelles() {
      return this.http.get<any>(this.baseUrl+'api/unite-organisationnelle').pipe(
       map(
         uniteorganisationnelleData => {
          return uniteorganisationnelleData;
         }));
  }
}
