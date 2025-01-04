import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Region} from 'app/components/modeles/region.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class RegionService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getRegionById(id: string): Observable<Region> {
    return this.http.get<Region>(this.baseUrl +'api/region/'+ id);
  }

  createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.baseUrl+'api/region', region);
  }

  updateRegion(region: Region): Observable<Region> {
    return this.http.put<Region>(this.baseUrl +'api/region/'+ region.id, region);
  }

  deleteRegion(id: string): Observable<Region> {
    return this.http.delete<Region>(this.baseUrl +'api/region/'+ id);
  }

  getRegions() {
      return this.http.get<any>(this.baseUrl+'api/region').pipe(
       map(
         regionData => {
          return regionData;
         }));
  }

  getRegionsByPays(id: string) {
      return this.http.get<any>(this.baseUrl+'api/region/'+id+'/pays').pipe(
       map(
         regionData => {
          return regionData;
         }));
  }
}
