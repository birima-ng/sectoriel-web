import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {VolumeChargement} from 'app/components/modeles/volume-chargement.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class VolumeChargementService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getVolumeChargementById(id: string): Observable<VolumeChargement> {
    return this.http.get<VolumeChargement>(this.baseUrl +'api/volume-chargement/'+ id);
  }

  createVolumeChargement(volumechargement: VolumeChargement): Observable<VolumeChargement> {
    return this.http.post<VolumeChargement>(this.baseUrl+'api/volume-chargement', volumechargement);
  }

  updateVolumeChargement(volumechargement: VolumeChargement): Observable<VolumeChargement> {
    return this.http.put<VolumeChargement>(this.baseUrl +'api/volume-chargement/'+ volumechargement.id, volumechargement);
  }

  deleteVolumeChargement(id: string): Observable<VolumeChargement> {
    return this.http.delete<VolumeChargement>(this.baseUrl +'api/volume-chargement/'+ id);
  }

  getVolumeChargements() {
      return this.http.get<any>(this.baseUrl+'api/volume-chargement').pipe(
       map(
         volumechargementData => {
          return volumechargementData;
         }));
  }
}
