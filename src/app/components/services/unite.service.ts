import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Unite} from "../modeles/unite.modele";
@Injectable({
providedIn: 'root'
})
export class UniteService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getUniteById(id: string): Observable<Unite> {
    return this.http.get<Unite>(this.baseUrl +'api/unite/'+ id);
  }

  createUnite(unite: Unite): Observable<Unite> {
    return this.http.post<Unite>(this.baseUrl+'api/unite', unite);
  }

  updateUnite(unite: Unite): Observable<Unite> {
    return this.http.put<Unite>(this.baseUrl +'api/unite/'+ unite.id, unite);
  }

  deleteUnite(id: string): Observable<Unite> {
    return this.http.delete<Unite>(this.baseUrl +'api/unite/'+ id);
  }

  getUnites() {
      return this.http.get<any>(this.baseUrl+'api/unite').pipe(
       map(
         uniteData => {
          return uniteData;
         }));
  }

  getUnitePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/unite-page?page='+page+'&size='+size);
  }
}
