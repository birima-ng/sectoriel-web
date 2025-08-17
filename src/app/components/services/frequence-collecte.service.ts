import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {FrequenceCollecte} from "../modeles/frequence-collecte.modele";
@Injectable({
providedIn: 'root'
})
export class FrequenceCollecteService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getFrequenceCollecteById(id: string): Observable<FrequenceCollecte> {
    return this.http.get<FrequenceCollecte>(this.baseUrl +'api/frequence-collecte/'+ id);
  }

  createFrequenceCollecte(frequencecollecte: FrequenceCollecte): Observable<FrequenceCollecte> {
    return this.http.post<FrequenceCollecte>(this.baseUrl+'api/frequence-collecte', frequencecollecte);
  }

  updateFrequenceCollecte(frequencecollecte: FrequenceCollecte): Observable<FrequenceCollecte> {
    return this.http.put<FrequenceCollecte>(this.baseUrl +'api/frequence-collecte/'+ frequencecollecte.id, frequencecollecte);
  }

  deleteFrequenceCollecte(id: string): Observable<FrequenceCollecte> {
    return this.http.delete<FrequenceCollecte>(this.baseUrl +'api/frequence-collecte/'+ id);
  }

  getFrequenceCollectes() {
      return this.http.get<any>(this.baseUrl+'api/frequence-collecte').pipe(
       map(
         frequencecollecteData => {
          return frequencecollecteData;
         }));
  }

  getFrequenceCollectePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/frequence-collecte-page?page='+page+'&size='+size);
  }
}
