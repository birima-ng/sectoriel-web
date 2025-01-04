import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {UniteFds} from 'app/components/modeles/unite-fds.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class UniteFdsService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getUniteFdsById(id: string): Observable<UniteFds> {
    return this.http.get<UniteFds>(this.baseUrl +'api/unite-fds/'+ id);
  }

  createUniteFds(unitefds: UniteFds): Observable<UniteFds> {
    return this.http.post<UniteFds>(this.baseUrl+'api/unite-fds', unitefds);
  }

  updateUniteFds(unitefds: UniteFds): Observable<UniteFds> {
    return this.http.put<UniteFds>(this.baseUrl +'api/unite-fds/'+ unitefds.id, unitefds);
  }

  deleteUniteFds(id: string): Observable<UniteFds> {
    return this.http.delete<UniteFds>(this.baseUrl +'api/unite-fds/'+ id);
  }

  getUniteFdss() {
      return this.http.get<any>(this.baseUrl+'api/unite-fds').pipe(
       map(
         unitefdsData => {
          return unitefdsData;
         }));
  }

  getUniteFdsByVillage(id: string) {
      return this.http.get<any>(this.baseUrl+'api/unite-fds/'+id+'/village').pipe(
       map(
         unitefdsData => {
          return unitefdsData;
         }));
  }

  getUniteFdsByTypeUniteFds(id: string) {
      return this.http.get<any>(this.baseUrl+'api/unite-fds/'+id+'/type-unite-fds').pipe(
       map(
         unitefdsData => {
          return unitefdsData;
         }));
  }
}
