import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Entreprise} from "../modeles/entreprise.modele";
import {SearchDto} from "../modeles/search-dto.modele";

@Injectable({
providedIn: 'root'
})
export class EntrepriseService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getEntrepriseById(id: string): Observable<Entreprise> {
    return this.http.get<Entreprise>(this.baseUrl +'api/entreprise/'+ id);
  }

  createEntreprise(entreprise: Entreprise): Observable<Entreprise> {
    return this.http.post<Entreprise>(this.baseUrl+'api/entreprise', entreprise);
  }

  updateEntreprise(entreprise: Entreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(this.baseUrl +'api/entreprise/'+ entreprise.id, entreprise);
  }

  deleteEntreprise(id: string): Observable<Entreprise> {
    return this.http.delete<Entreprise>(this.baseUrl +'api/entreprise/'+ id);
  }

  getEntrepriseSearch(searchdto: SearchDto) {
      return this.http.post<any>(this.baseUrl+'api/entreprise/search', searchdto).pipe(
       map(
         entrepriseData => {
          return entrepriseData;
         }));
  }

 getEntreprises() {
      return this.http.get<any>(this.baseUrl+'api/entreprise').pipe(
       map(
         entrepriseData => {
          return entrepriseData;
         }));
  }

}
