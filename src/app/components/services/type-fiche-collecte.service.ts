import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {TypeFicheCollecte} from "../modeles/type-fiche-collecte.modele";
@Injectable({
providedIn: 'root'
})
export class TypeFicheCollecteService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getTypeFicheCollecteById(id: string): Observable<TypeFicheCollecte> {
    return this.http.get<TypeFicheCollecte>(this.baseUrl +'api/type-fiche-collecte/'+ id);
  }

  createTypeFicheCollecte(typefichecollecte: TypeFicheCollecte): Observable<TypeFicheCollecte> {
    return this.http.post<TypeFicheCollecte>(this.baseUrl+'api/type-fiche-collecte', typefichecollecte);
  }

  updateTypeFicheCollecte(typefichecollecte: TypeFicheCollecte): Observable<TypeFicheCollecte> {
    return this.http.put<TypeFicheCollecte>(this.baseUrl +'api/type-fiche-collecte/'+ typefichecollecte.id, typefichecollecte);
  }

  deleteTypeFicheCollecte(id: string): Observable<TypeFicheCollecte> {
    return this.http.delete<TypeFicheCollecte>(this.baseUrl +'api/type-fiche-collecte/'+ id);
  }

  getTypeFicheCollectes() {
      return this.http.get<any>(this.baseUrl+'api/type-fiche-collecte').pipe(
       map(
         typefichecollecteData => {
          return typefichecollecteData;
         }));
  }

  getTypeFicheCollectePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/type-fiche-collecte-page?page='+page+'&size='+size);
  }
}
