import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Decoupage1} from "../modeles/decoupage1.modele";
@Injectable({
providedIn: 'root'
})
export class Decoupage1Service {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getDecoupage1ById(id: string): Observable<Decoupage1> {
    return this.http.get<Decoupage1>(this.baseUrl +'api/decoupage1/'+ id);
  }

  createDecoupage1(decoupage1: Decoupage1): Observable<Decoupage1> {
    return this.http.post<Decoupage1>(this.baseUrl+'api/decoupage1', decoupage1);
  }

  updateDecoupage1(decoupage1: Decoupage1): Observable<Decoupage1> {
    return this.http.put<Decoupage1>(this.baseUrl +'api/decoupage1/'+ decoupage1.id, decoupage1);
  }

  deleteDecoupage1(id: string): Observable<Decoupage1> {
    return this.http.delete<Decoupage1>(this.baseUrl +'api/decoupage1/'+ id);
  }

  getDecoupage1s() {
      return this.http.get<any>(this.baseUrl+'api/decoupage1').pipe(
       map(
         decoupage1Data => {
          return decoupage1Data;
         }));
  }

  getDecoupage1sPays() {
      return this.http.get<any>(this.baseUrl+'api/decoupage1/pays').pipe(
       map(
         decoupage1Data => {
          return decoupage1Data;
         }));
  }

  getDecoupage1Pages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/decoupage1-page?page='+page+'&size='+size);
  }

  getDecoupage1PagesPays(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/decoupage1-page/pays?page='+page+'&size='+size);
  }

}
