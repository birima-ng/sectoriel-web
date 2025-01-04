import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Pieton} from "../modeles/pieton.modele";
@Injectable({
providedIn: 'root'
})
export class PietonService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getPietonById(id: string): Observable<Pieton> {
    return this.http.get<Pieton>(this.baseUrl +'api/pieton/'+ id);
  }

  createPieton(pieton: Pieton): Observable<Pieton> {
    return this.http.post<Pieton>(this.baseUrl+'api/pieton', pieton);
  }

  updatePieton(pieton: Pieton): Observable<Pieton> {
    return this.http.put<Pieton>(this.baseUrl +'api/pieton/'+ pieton.id, pieton);
  }

  deletePieton(id: string): Observable<Pieton> {
    return this.http.delete<Pieton>(this.baseUrl +'api/pieton/'+ id);
  }

  getPietons() {
      return this.http.get<any>(this.baseUrl+'api/pieton').pipe(
       map(
         pietonData => {
          return pietonData;
         }));
  }

  getPietonBaacs(id: string) {
      return this.http.get<any>(this.baseUrl+'api/pieton/'+id+'/baac').pipe(
       map(
         pietonData => {
          return pietonData;
         }));
  }

}
