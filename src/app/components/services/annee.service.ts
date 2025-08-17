import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Annee} from "../modeles/annee.modele";
@Injectable({
providedIn: 'root'
})
export class AnneeService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getAnneeById(id: string): Observable<Annee> {
    return this.http.get<Annee>(this.baseUrl +'api/annee/'+ id);
  }

  createAnnee(annee: Annee): Observable<Annee> {
    return this.http.post<Annee>(this.baseUrl+'api/annee', annee);
  }

  updateAnnee(annee: Annee): Observable<Annee> {
    return this.http.put<Annee>(this.baseUrl +'api/annee/'+ annee.id, annee);
  }

  deleteAnnee(id: string): Observable<Annee> {
    return this.http.delete<Annee>(this.baseUrl +'api/annee/'+ id);
  }

  getAnnees() {
      return this.http.get<any>(this.baseUrl+'api/annee').pipe(
       map(
         anneeData => {
          return anneeData;
         }));
  }

  getAnneePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/annee-page?page='+page+'&size='+size);
  }
}
