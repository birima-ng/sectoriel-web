import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Categorie} from "../modeles/categorie.modele";
@Injectable({
providedIn: 'root'
})
export class CategorieService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getCategorieById(id: string): Observable<Categorie> {
    return this.http.get<Categorie>(this.baseUrl +'api/categorie/'+ id);
  }

  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.baseUrl+'api/categorie', categorie);
  }

  updateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(this.baseUrl +'api/categorie/'+ categorie.id, categorie);
  }

  deleteCategorie(id: string): Observable<Categorie> {
    return this.http.delete<Categorie>(this.baseUrl +'api/categorie/'+ id);
  }

  getCategories() {
      return this.http.get<any>(this.baseUrl+'api/categorie').pipe(
       map(
         categorieData => {
          return categorieData;
         }));
  }
}
