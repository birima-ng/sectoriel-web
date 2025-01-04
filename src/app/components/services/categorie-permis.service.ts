import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {CategoriePermis} from 'app/components/modeles/categorie-permis.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class CategoriePermisService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getCategoriePermisById(id: string): Observable<CategoriePermis> {
    return this.http.get<CategoriePermis>(this.baseUrl +'api/categorie-permis/'+ id);
  }

  createCategoriePermis(categoriepermis: CategoriePermis): Observable<CategoriePermis> {
    return this.http.post<CategoriePermis>(this.baseUrl+'api/categorie-permis', categoriepermis);
  }

  updateCategoriePermis(categoriepermis: CategoriePermis): Observable<CategoriePermis> {
    return this.http.put<CategoriePermis>(this.baseUrl +'api/categorie-permis/'+ categoriepermis.id, categoriepermis);
  }

  deleteCategoriePermis(id: string): Observable<CategoriePermis> {
    return this.http.delete<CategoriePermis>(this.baseUrl +'api/categorie-permis/'+ id);
  }

  getCategoriePermiss() {
      return this.http.get<any>(this.baseUrl+'api/categorie-permis').pipe(
       map(
         categoriepermisData => {
          return categoriepermisData;
         }));
  }
}
