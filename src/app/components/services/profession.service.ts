import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Profession} from "../modeles/profession.modele";

@Injectable({
providedIn: 'root'
})
export class ProfessionService{
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getProfessionById(id: string): Observable<Profession> {
    return this.http.get<Profession>(this.baseUrl +'api/profession/'+ id);
  }

  createProfession(profession: Profession): Observable<Profession> {
    return this.http.post<Profession>(this.baseUrl+'api/profession', profession);
  }

  updateProfession(profession: Profession): Observable<Profession> {
    return this.http.put<Profession>(this.baseUrl +'api/profession/'+ profession.id, profession);
  }

  deleteProfession(id: string): Observable<Profession> {
    return this.http.delete<Profession>(this.baseUrl +'api/profession/'+ id);
  }

  getProfessions() {
      return this.http.get<any>(this.baseUrl+'api/profession').pipe(
       map(
         professionData => {
          return professionData;
         }));
  }
}
