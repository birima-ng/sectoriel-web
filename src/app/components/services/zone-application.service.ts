import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ZoneApplication} from "../modeles/zone-application.modele";

@Injectable({
providedIn: 'root'
})
export class ZoneApplicationService{
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getZoneApplicationById(id: string): Observable<ZoneApplication> {
    return this.http.get<ZoneApplication>(this.baseUrl +'api/zone-application/'+ id);
  }

  createZoneApplication(zoneapplication: ZoneApplication): Observable<ZoneApplication> {
    return this.http.post<ZoneApplication>(this.baseUrl+'api/zone-application', zoneapplication);
  }

  updateZoneApplication(zoneapplication: ZoneApplication): Observable<ZoneApplication> {
    return this.http.put<ZoneApplication>(this.baseUrl +'api/zone-application/'+ zoneapplication.id, zoneapplication);
  }

  deleteZoneApplication(id: string): Observable<ZoneApplication> {
    return this.http.delete<ZoneApplication>(this.baseUrl +'api/zone-application/'+ id);
  }

  getZoneApplications() {
      return this.http.get<any>(this.baseUrl+'api/zone-application').pipe(
       map(
         zoneapplicationData => {
          return zoneapplicationData;
         }));
  }
}
