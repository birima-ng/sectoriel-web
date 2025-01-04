import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Pays} from 'app/components/modeles/pays.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class PaysService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getPaysById(id: string): Observable<Pays> {
    return this.http.get<Pays>(this.baseUrl +'api/pays/'+ id);
  }

  createPays(pays: Pays): Observable<Pays> {
    return this.http.post<Pays>(this.baseUrl+'api/pays', pays);
  }

  updatePays(pays: Pays): Observable<Pays> {
    return this.http.put<Pays>(this.baseUrl +'api/pays/'+ pays.id, pays);
  }

  deletePays(id: string): Observable<Pays> {
    return this.http.delete<Pays>(this.baseUrl +'api/pays/'+ id);
  }

  getPayss() {
      return this.http.get<any>(this.baseUrl+'api/pays').pipe(
       map(
         paysData => {
          return paysData;
         }));
  }

}
