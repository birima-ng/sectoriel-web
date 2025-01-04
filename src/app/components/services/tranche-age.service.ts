import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {TrancheAge} from "../modeles/tranche-age.modele";
@Injectable({
providedIn: 'root'
})
export class TrancheAgeService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getTrancheAgeById(id: string): Observable<TrancheAge> {
    return this.http.get<TrancheAge>(this.baseUrl +'api/tranche-age/'+ id);
  }

  createTrancheAge(trancheage: TrancheAge): Observable<TrancheAge> {
    return this.http.post<TrancheAge>(this.baseUrl+'api/tranche-age', trancheage);
  }

  updateTrancheAge(trancheage: TrancheAge): Observable<TrancheAge> {
    return this.http.put<TrancheAge>(this.baseUrl +'api/tranche-age/'+ trancheage.id, trancheage);
  }

  deleteTrancheAge(id: string): Observable<TrancheAge> {
    return this.http.delete<TrancheAge>(this.baseUrl +'api/tranche-age/'+ id);
  }

  getTrancheAge() {
      return this.http.get<any>(this.baseUrl+'api/tranche-age').pipe(
       map(
         trancheageData => {
          return trancheageData;
         }));
  }
}
