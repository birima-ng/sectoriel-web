import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {TypeChargement} from 'app/components/modeles/type-chargement.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class TypeChargementService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getTypeChargementById(id: string): Observable<TypeChargement> {
    return this.http.get<TypeChargement>(this.baseUrl +'api/type-chargement/'+ id);
  }

  createTypeChargement(typechargement: TypeChargement): Observable<TypeChargement> {
    return this.http.post<TypeChargement>(this.baseUrl+'api/type-chargement', typechargement);
  }

  updateTypeChargement(typechargement: TypeChargement): Observable<TypeChargement> {
    return this.http.put<TypeChargement>(this.baseUrl +'api/type-chargement/'+ typechargement.id, typechargement);
  }

  deleteTypeChargement(id: string): Observable<TypeChargement> {
    return this.http.delete<TypeChargement>(this.baseUrl +'api/type-chargement/'+ id);
  }

  getTypeChargements() {
      return this.http.get<any>(this.baseUrl+'api/type-chargement').pipe(
       map(
         typechargementData => {
          return typechargementData;
         }));
  }
}
