import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Systeme} from "../modeles/systeme.modele";
@Injectable({
providedIn: 'root'
})
export class SystemeService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getSystemeById(id: string): Observable<Systeme> {
    return this.http.get<Systeme>(this.baseUrl +'api/systeme/'+ id);
  }

  createSysteme(systeme: Systeme): Observable<Systeme> {
    return this.http.post<Systeme>(this.baseUrl+'api/systeme', systeme);
  }

  updateSysteme(systeme: Systeme): Observable<Systeme> {
    return this.http.put<Systeme>(this.baseUrl +'api/systeme/'+ systeme.id, systeme);
  }

  deleteSysteme(id: string): Observable<Systeme> {
    return this.http.delete<Systeme>(this.baseUrl +'api/systeme/'+ id);
  }

  getSystemes() {
      return this.http.get<any>(this.baseUrl+'api/systeme').pipe(
       map(
         systemeData => {
          return systemeData;
         }));
  }

  getSystemePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/systeme-page?page='+page+'&size='+size);
  }

  getSystemePageCurrent(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/systeme-page/current?page='+page+'&size='+size);
  }
}
