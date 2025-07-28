import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {TypeUnite} from "../modeles/type-unite.modele";
@Injectable({
providedIn: 'root'
})
export class TypeUniteService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getTypeUniteById(id: string): Observable<TypeUnite> {
    return this.http.get<TypeUnite>(this.baseUrl +'api/type-unite/'+ id);
  }

  createTypeUnite(typeunite: TypeUnite): Observable<TypeUnite> {
    return this.http.post<TypeUnite>(this.baseUrl+'api/type-unite', typeunite);
  }

  updateTypeUnite(typeunite: TypeUnite): Observable<TypeUnite> {
    return this.http.put<TypeUnite>(this.baseUrl +'api/type-unite/'+ typeunite.id, typeunite);
  }

  deleteTypeUnite(id: string): Observable<TypeUnite> {
    return this.http.delete<TypeUnite>(this.baseUrl +'api/type-unite/'+ id);
  }

  getTypeUnites() {
      return this.http.get<any>(this.baseUrl+'api/type-unite').pipe(
       map(
         typeuniteData => {
          return typeuniteData;
         }));
  }

  getTypeUnitePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/type-unite-page?page='+page+'&size='+size);
  }
}
