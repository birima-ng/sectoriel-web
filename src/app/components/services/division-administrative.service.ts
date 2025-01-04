import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {DivisionAdministrative} from 'app/components/modeles/division-administrative.modele';
import {DivisionAdministrativeDto} from 'app/components/modeles/division-administrative-dto.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class DivisionAdministrativeService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getDivisionAdministrativeById(id: string): Observable<DivisionAdministrative> {
    return this.http.get<DivisionAdministrative>(this.baseUrl +'api/division-administrative/'+ id);
  }

  createDivisionAdministrative(divisionadministrative: DivisionAdministrative): Observable<DivisionAdministrative> {
    return this.http.post<DivisionAdministrative>(this.baseUrl+'api/division-administrative', divisionadministrative);
  }

  updateDivisionAdministrative(divisionadministrative: DivisionAdministrative): Observable<DivisionAdministrative> {
    return this.http.put<DivisionAdministrative>(this.baseUrl +'api/division-administrative/'+ divisionadministrative.id, divisionadministrative);
  }

  deleteDivisionAdministrative(id: string): Observable<DivisionAdministrative> {
    return this.http.delete<DivisionAdministrative>(this.baseUrl +'api/division-administrative/'+ id);
  }

  getDivisionAdministratives() {
      return this.http.get<any>(this.baseUrl+'api/division-administrative').pipe(
       map(
         divisionadministrativeData => {
          return divisionadministrativeData;
         }));
  }
}
