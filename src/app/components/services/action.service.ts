import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Action} from 'app/components/modeles/action.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class ActionService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getActionById(id: string): Observable<Action> {
    return this.http.get<Action>(this.baseUrl +'api/action/'+ id);
  }

  createAction(action: Action): Observable<Action> {
    return this.http.post<Action>(this.baseUrl+'api/action', action);
  }

  updateAction(action: Action): Observable<Action> {
    return this.http.put<Action>(this.baseUrl +'api/action/'+ action.id, action);
  }

  deleteAction(id: string): Observable<Action> {
    return this.http.delete<Action>(this.baseUrl +'api/action/'+ id);
  }

  getActions() {
      return this.http.get<any>(this.baseUrl+'api/action').pipe(
       map(
         actionData => {
          return actionData;
         }));
  }

  getActions1() {
      return this.http.get<any>(this.baseUrl+'api/action1').pipe(
       map(
         actionData => {
          return actionData;
         }));
  }

  getActionByFeatureId(id: string) {
      return this.http.get<any>(this.baseUrl+'api/action/'+id+'/feature').pipe(
       map(
         actionData => {
          return actionData;
         }));
  }

  getActionBySysteme() {
      return this.http.get<any>(this.baseUrl+'api/action/systeme').pipe(
       map(
         actionData => {
          return actionData;
         }));
  }
}
