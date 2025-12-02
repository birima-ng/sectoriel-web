import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {CampagneAgricol} from "../modeles/campagne-agricol.modele";
@Injectable({
providedIn: 'root'
})
export class CampagneAgricolService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getCampagneAgricolById(id: string): Observable<CampagneAgricol> {
    return this.http.get<CampagneAgricol>(this.baseUrl +'api/campagne-agricol/'+ id);
  }

  createCampagneAgricol(campagneagricol: CampagneAgricol): Observable<CampagneAgricol> {
    return this.http.post<CampagneAgricol>(this.baseUrl+'api/campagne-agricol', campagneagricol);
  }

  updateCampagneAgricol(campagneagricol: CampagneAgricol): Observable<CampagneAgricol> {
    return this.http.put<CampagneAgricol>(this.baseUrl +'api/campagne-agricol/'+ campagneagricol.id, campagneagricol);
  }

  deleteCampagneAgricol(id: string): Observable<CampagneAgricol> {
    return this.http.delete<CampagneAgricol>(this.baseUrl +'api/campagne-agricol/'+ id);
  }

  getCampagneAgricols() {
      return this.http.get<any>(this.baseUrl+'api/campagne-agricol').pipe(
       map(
         campagneagricolData => {
          return campagneagricolData;
         }));
  }

  getCampagneAgricolPages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/campagne-agricol-page?page='+page+'&size='+size);
  }
}
