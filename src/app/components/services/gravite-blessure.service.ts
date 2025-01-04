import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {GraviteBlessure} from "../modeles/gravite-blessure.modele";
@Injectable({
providedIn: 'root'
})
export class GraviteBlessureService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getGraviteBlessureById(id: string): Observable<GraviteBlessure> {
    return this.http.get<GraviteBlessure>(this.baseUrl +'api/gravite-blessure/'+ id);
  }

  createGraviteBlessure(graviteblessure: GraviteBlessure): Observable<GraviteBlessure> {
    return this.http.post<GraviteBlessure>(this.baseUrl+'api/gravite-blessure', graviteblessure);
  }

  updateGraviteBlessure(graviteblessure: GraviteBlessure): Observable<GraviteBlessure> {
    return this.http.put<GraviteBlessure>(this.baseUrl +'api/gravite-blessure/'+ graviteblessure.id, graviteblessure);
  }

  deleteGraviteBlessure(id: string): Observable<GraviteBlessure> {
    return this.http.delete<GraviteBlessure>(this.baseUrl +'api/gravite-blessure/'+ id);
  }

  getGraviteBlessures() {
      return this.http.get<any>(this.baseUrl+'api/gravite-blessure').pipe(
       map(
         graviteblessureData => {
          return graviteblessureData;
         }));
  }
}
