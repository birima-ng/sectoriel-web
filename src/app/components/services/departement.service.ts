import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Departement} from 'app/components/modeles/departement.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class DepartementService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getDepartementById(id: string): Observable<Departement> {
    return this.http.get<Departement>(this.baseUrl +'api/departement/'+ id);
  }

  createDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.baseUrl+'api/departement', departement);
  }

  updateDepartement(departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(this.baseUrl +'api/departement/'+ departement.id, departement);
  }

  deleteDepartement(id: string): Observable<Departement> {
    return this.http.delete<Departement>(this.baseUrl +'api/departement/'+ id);
  }

  getDepartements() {
      return this.http.get<any>(this.baseUrl+'api/departement').pipe(
       map(
         departementData => {
          return departementData;
         }));
  }

  getDepartementsByRegion(id: string) {
      return this.http.get<any>(this.baseUrl+'api/departement/'+id+'/region').pipe(
       map(
         departementData => {
          return departementData;
         }));
  }
}
