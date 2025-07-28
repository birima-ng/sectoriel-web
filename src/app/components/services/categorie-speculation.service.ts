import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {CategorieSpeculation} from "../modeles/categorie-speculation.modele";
@Injectable({
providedIn: 'root'
})
export class CategorieSpeculationService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getCategorieSpeculationById(id: string): Observable<CategorieSpeculation> {
    return this.http.get<CategorieSpeculation>(this.baseUrl +'api/categorie-speculation/'+ id);
  }

  createCategorieSpeculation(categoriespeculation: CategorieSpeculation): Observable<CategorieSpeculation> {
    return this.http.post<CategorieSpeculation>(this.baseUrl+'api/categorie-speculation', categoriespeculation);
  }

  updateCategorieSpeculation(categoriespeculation: CategorieSpeculation): Observable<CategorieSpeculation> {
    return this.http.put<CategorieSpeculation>(this.baseUrl +'api/categorie-speculation/'+ categoriespeculation.id, categoriespeculation);
  }

  deleteCategorieSpeculation(id: string): Observable<CategorieSpeculation> {
    return this.http.delete<CategorieSpeculation>(this.baseUrl +'api/categorie-speculation/'+ id);
  }

  getCategorieSpeculations() {
      return this.http.get<any>(this.baseUrl+'api/categorie-speculation').pipe(
       map(
         categoriespeculationData => {
          return categoriespeculationData;
         }));
  }

  getCategorieSpeculationPages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/categorie-speculation-page?page='+page+'&size='+size);
  }
}
