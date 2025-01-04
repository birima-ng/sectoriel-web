import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Village} from 'app/components/modeles/village.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class VillageService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getVillageById(id: string): Observable<Village> {
    return this.http.get<Village>(this.baseUrl +'api/village/'+ id);
  }

  createVillage(village: Village): Observable<Village> {
    return this.http.post<Village>(this.baseUrl+'api/village', village);
  }

  updateVillage(village: Village): Observable<Village> {
    return this.http.put<Village>(this.baseUrl +'api/village/'+ village.id, village);
  }

  deleteVillage(id: string): Observable<Village> {
    return this.http.delete<Village>(this.baseUrl +'api/village/'+ id);
  }

  getVillages() {
      return this.http.get<any>(this.baseUrl+'api/village').pipe(
       map(
         villageData => {
          return villageData;
         }));
  }

  getVillagesByCommune(id: string) {
      return this.http.get<any>(this.baseUrl+'api/village/'+id+'/commune').pipe(
       map(
         villageData => {
          return villageData;
         }));
  }
}
