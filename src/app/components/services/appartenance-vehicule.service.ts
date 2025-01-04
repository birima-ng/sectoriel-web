import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {UniteFds} from 'app/components/modeles/unite-fds.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {AppartenanceVehicule} from "../modeles/appartenance-vehicule.modele";
@Injectable({
providedIn: 'root'
})
export class AppartenanceVehiculeService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getAppartenanceVehiculeById(id: string): Observable<AppartenanceVehicule> {
    return this.http.get<AppartenanceVehicule>(this.baseUrl +'api/appartenance-vehicule/'+ id);
  }

  createAppartenanceVehicule(unitefds: UniteFds): Observable<AppartenanceVehicule> {
    return this.http.post<AppartenanceVehicule>(this.baseUrl+'api/appartenance-vehicule', unitefds);
  }

  updateAppartenanceVehicule(unitefds: UniteFds): Observable<AppartenanceVehicule> {
    return this.http.put<AppartenanceVehicule>(this.baseUrl +'api/appartenance-vehicule/'+ unitefds.id, unitefds);
  }

  deleteAppartenanceVehicule(id: string): Observable<AppartenanceVehicule> {
    return this.http.delete<AppartenanceVehicule>(this.baseUrl +'api/appartenance-vehicule/'+ id);
  }

  getAppartenanceVehicules() {
      return this.http.get<any>(this.baseUrl+'api/appartenance-vehicule').pipe(
       map(
         unitefdsData => {
          return unitefdsData;
         }));
  }

  /*getUniteFdsByVillage(id: string) {
      return this.http.get<any>(this.baseUrl+'api/unite-fds/'+id+'/village').pipe(
       map(
         unitefdsData => {
          return unitefdsData;
         }));
  }

  getUniteFdsByTypeUniteFds(id: string) {
      return this.http.get<any>(this.baseUrl+'api/unite-fds/'+id+'/type-unite-fds').pipe(
       map(
         unitefdsData => {
          return unitefdsData;
         }));
  }*/
}
