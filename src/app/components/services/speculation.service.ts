import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Speculation} from "../modeles/speculation.modele";
@Injectable({
providedIn: 'root'
})
export class SpeculationService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getSpeculationById(id: string): Observable<Speculation> {
    return this.http.get<Speculation>(this.baseUrl +'api/speculation/'+ id);
  }

  createSpeculation(speculation: Speculation): Observable<Speculation> {
    return this.http.post<Speculation>(this.baseUrl+'api/speculation', speculation);
  }

  updateSpeculation(speculation: Speculation): Observable<Speculation> {
    return this.http.put<Speculation>(this.baseUrl +'api/speculation/'+ speculation.id, speculation);
  }

  deleteSpeculation(id: string): Observable<Speculation> {
    return this.http.delete<Speculation>(this.baseUrl +'api/speculation/'+ id);
  }

  getSpeculations() {
      return this.http.get<any>(this.baseUrl+'api/speculation').pipe(
       map(
         speculationData => {
          return speculationData;
         }));
  }

  getSpeculationPages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/speculation-page?page='+page+'&size='+size);
  }
}
