import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ServiceDepartement} from "../modeles/service-departement.modele";
@Injectable({
providedIn: 'root'
})
export class ServiceDepartementService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getServiceDepartementById(id: string): Observable<ServiceDepartement> {
    return this.http.get<ServiceDepartement>(this.baseUrl +'api/service-departement/'+ id);
  }

  createServiceDepartement(servicedepartement: ServiceDepartement): Observable<ServiceDepartement> {
    return this.http.post<ServiceDepartement>(this.baseUrl+'api/service-departement', servicedepartement);
  }

  updateServiceDepartement(servicedepartement: ServiceDepartement): Observable<ServiceDepartement> {
    return this.http.put<ServiceDepartement>(this.baseUrl +'api/service-departement/'+ servicedepartement.id, servicedepartement);
  }

  deleteServiceDepartement(id: string): Observable<ServiceDepartement> {
    return this.http.delete<ServiceDepartement>(this.baseUrl +'api/service-departement/'+ id);
  }

  getServiceDepartements() {
      return this.http.get<any>(this.baseUrl+'api/service-departement').pipe(
       map(
         servicedepartementData => {
          return servicedepartementData;
         }));
  }
}
