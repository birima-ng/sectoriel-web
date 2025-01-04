import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {VehiculeImplique} from 'app/components/modeles/vehicule-implique.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class VehiculeImpliqueService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getVehiculeImpliqueById(id: string): Observable<VehiculeImplique> {
    return this.http.get<VehiculeImplique>(this.baseUrl +'api/vehicule-implique/'+ id);
  }

  createVehiculeImplique(vehiculeimplique: VehiculeImplique): Observable<VehiculeImplique> {
    return this.http.post<VehiculeImplique>(this.baseUrl+'api/vehicule-implique', vehiculeimplique);
  }

  updateVehiculeImplique(vehiculeimplique: VehiculeImplique): Observable<VehiculeImplique> {
    return this.http.put<VehiculeImplique>(this.baseUrl +'api/vehicule-implique/'+ vehiculeimplique.id, vehiculeimplique);
  }

  deleteVehiculeImplique(id: string): Observable<VehiculeImplique> {
    return this.http.delete<VehiculeImplique>(this.baseUrl +'api/vehicule-implique/'+ id);
  }

  getVehiculeImpliques() {
      return this.http.get<any>(this.baseUrl+'api/vehicule-implique').pipe(
       map(
         vehiculeimpliqueData => {
          return vehiculeimpliqueData;
         }));
  }

  getVehiculeImpliqueBaacs(idbaac: string) {
      return this.http.get<any>(this.baseUrl+'api/vehicule-implique/'+idbaac+'/baac').pipe(
       map(
         vehiculeimpliqueData => {
          return vehiculeimpliqueData;
         }));
  }
}
