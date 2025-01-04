import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Courrier} from 'app/components/modeles/courrier.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class CourrierService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getCourrierById(id: string): Observable<Courrier> {
    return this.http.get<Courrier>(this.baseUrl +'api/courrier/'+ id);
  }

  createCourrier(courrier: Courrier): Observable<Courrier> {
    return this.http.post<Courrier>(this.baseUrl+'api/courrier', courrier);
  }

  updateCourrier(courrier: Courrier): Observable<Courrier> {
    return this.http.put<Courrier>(this.baseUrl +'api/courrier/'+ courrier.id, courrier);
  }

  deleteCourrier(id: string): Observable<Courrier> {
    return this.http.delete<Courrier>(this.baseUrl +'api/courrier/'+ id);
  }

  getCourriers() {
      return this.http.get<any>(this.baseUrl+'api/courrier').pipe(
       map(
         courrierData => {
          return courrierData;
         }));
  }

  getCourrierByContact(id: string) {
      return this.http.get<any>(this.baseUrl+'api/courrier/'+id+'/contact').pipe(
       map(
         courrierData => {
          return courrierData;
         }));
  }

  getCourrierByUser(id: string) {
      return this.http.get<any>(this.baseUrl+'api/courrier/'+id+'/user').pipe(
       map(
         courrierData => {
          return courrierData;
         }));
  }

  getCourrierByThematique(id: string) {
      return this.http.get<any>(this.baseUrl+'api/courrier/'+id+'/thematique').pipe(
       map(
         courrierData => {
          return courrierData;
         }));
  }

  getCourrierByEtatCourrier(id: string) {
      return this.http.get<any>(this.baseUrl+'api/courrier/'+id+'/etat-courrier').pipe(
       map(
         courrierData => {
          return courrierData;
         }));
  }

}
