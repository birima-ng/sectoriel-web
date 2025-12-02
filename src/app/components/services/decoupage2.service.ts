import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Decoupage2} from "../modeles/decoupage2.modele";
@Injectable({
providedIn: 'root'
})
export class Decoupage2Service {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getDecoupage2ById(id: string): Observable<Decoupage2> {
    return this.http.get<Decoupage2>(this.baseUrl +'api/decoupage2/'+ id);
  }

  createDecoupage2(decoupage2: Decoupage2): Observable<Decoupage2> {
    return this.http.post<Decoupage2>(this.baseUrl+'api/decoupage2', decoupage2);
  }

  updateDecoupage2(decoupage2: Decoupage2): Observable<Decoupage2> {
    return this.http.put<Decoupage2>(this.baseUrl +'api/decoupage2/'+ decoupage2.id, decoupage2);
  }

  deleteDecoupage2(id: string): Observable<Decoupage2> {
    return this.http.delete<Decoupage2>(this.baseUrl +'api/decoupage2/'+ id);
  }

  getDecoupage2s() {
      return this.http.get<any>(this.baseUrl+'api/decoupage2').pipe(
       map(
         decoupage2Data => {
          return decoupage2Data;
         }));
  }

  getDecoupage2sPays() {
      return this.http.get<any>(this.baseUrl+'api/decoupage2/pays').pipe(
       map(
         decoupage2Data => {
          return decoupage2Data;
         }));
  }

  getDecoupage2Pages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/decoupage2-page?page='+page+'&size='+size);
  }

  getDecoupage2PagesPays(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/decoupage2-page/pays?page='+page+'&size='+size);
  }
}
