import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Lumiere} from "../modeles/lumiere.modele";
@Injectable({
providedIn: 'root'
})
export class LumiereService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getLumiereById(id: string): Observable<Lumiere> {
    return this.http.get<Lumiere>(this.baseUrl +'api/lumiere/'+ id);
  }

  createLumiere(lumiere: Lumiere): Observable<Lumiere> {
    return this.http.post<Lumiere>(this.baseUrl+'api/lumiere', lumiere);
  }

  updateLumiere(lumiere: Lumiere): Observable<Lumiere> {
    return this.http.put<Lumiere>(this.baseUrl +'api/lumiere/'+ lumiere.id, lumiere);
  }

  deleteLumiere(id: string): Observable<Lumiere> {
    return this.http.delete<Lumiere>(this.baseUrl +'api/lumiere/'+ id);
  }

  getLumieres() {
      return this.http.get<any>(this.baseUrl+'api/lumiere').pipe(
       map(
         lumiereData => {
          return lumiereData;
         }));
  }
}
