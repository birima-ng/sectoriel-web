import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Baac} from 'app/components/modeles/baac.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class BaacService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getBaacById(id: string): Observable<Baac> {
    return this.http.get<Baac>(this.baseUrl +'api/baac/'+ id);
  }

  createBaac(baac: Baac): Observable<Baac> {
    return this.http.post<Baac>(this.baseUrl+'api/baac', baac);
  }

  updateBaac(baac: Baac): Observable<Baac> {
    return this.http.put<Baac>(this.baseUrl +'api/baac/'+ baac.id, baac);
  }

  deleteBaac(id: string): Observable<Baac> {
    return this.http.delete<Baac>(this.baseUrl +'api/baac/'+ id);
  }

  getBaacs() {
      return this.http.get<any>(this.baseUrl+'api/baac').pipe(
       map(
         baacData => {
          return baacData;
         }));
  }

  getBaacVehiculeImpliqueDtos(id: string) {
      return this.http.get<any>(this.baseUrl+'api/baac/vehicule-implique/'+id+'/dto').pipe(
       map(
         baacData => {
          return baacData;
         }));
  }
}
