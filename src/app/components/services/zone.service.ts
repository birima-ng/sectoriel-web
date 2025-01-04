import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Zone} from 'app/components/modeles/zone.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class ZoneService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getZoneById(id: string): Observable<Zone> {
    return this.http.get<Zone>(this.baseUrl +'api/zone/'+ id);
  }

  createZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.baseUrl+'api/zone', zone);
  }

  updateZone(zone: Zone): Observable<Zone> {
    return this.http.put<Zone>(this.baseUrl +'api/zone/'+ zone.id, zone);
  }

  deleteZone(id: string): Observable<Zone> {
    return this.http.delete<Zone>(this.baseUrl +'api/zone/'+ id);
  }

  getZones() {
      return this.http.get<any>(this.baseUrl+'api/zone').pipe(
       map(
         zoneData => {
          return zoneData;
         }));
  }
}
