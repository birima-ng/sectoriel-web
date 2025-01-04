import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ConditionAtmospherique} from "../modeles/condition-atmospherique.modele";
@Injectable({
providedIn: 'root'
})
export class ConditionAtmospheriqueService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getConditionAtmospheriqueById(id: string): Observable<ConditionAtmospherique> {
    return this.http.get<ConditionAtmospherique>(this.baseUrl +'api/condition-atmospherique/'+ id);
  }

  createConditionAtmospherique(conditionatmospherique: ConditionAtmospherique): Observable<ConditionAtmospherique> {
    return this.http.post<ConditionAtmospherique>(this.baseUrl+'api/condition-atmospherique', conditionatmospherique);
  }

  updateConditionAtmospherique(conditionatmospherique: ConditionAtmospherique): Observable<ConditionAtmospherique> {
    return this.http.put<ConditionAtmospherique>(this.baseUrl +'api/condition-atmospherique/'+ conditionatmospherique.id, conditionatmospherique);
  }

  deleteConditionAtmospherique(id: string): Observable<ConditionAtmospherique> {
    return this.http.delete<ConditionAtmospherique>(this.baseUrl +'api/condition-atmospherique/'+ id);
  }

  geConditionAtmospheriques() {
      return this.http.get<any>(this.baseUrl+'api/condition-atmospherique').pipe(
       map(
         conditionatmospheriqueData => {
          return conditionatmospheriqueData;
         }));
  }
}
