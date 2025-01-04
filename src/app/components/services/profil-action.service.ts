import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {ProfilAction} from 'app/components/modeles/profil-action.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class ProfilActionService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getProfilActionById(id: string): Observable<ProfilAction> {
    return this.http.get<ProfilAction>(this.baseUrl +'api/profil-action/'+ id);
  }

  createProfilAction(profilaction: ProfilAction): Observable<ProfilAction> {
    return this.http.post<ProfilAction>(this.baseUrl+'api/profil-action', profilaction);
  }

  updateProfilAction(profilaction: ProfilAction): Observable<ProfilAction> {
    return this.http.put<ProfilAction>(this.baseUrl +'api/profil-action/'+ profilaction.id, profilaction);
  }

  deleteProfilAction(id: string): Observable<ProfilAction> {
    return this.http.delete<ProfilAction>(this.baseUrl +'api/profil-action/'+ id);
  }

  getProfilActions() {
      return this.http.get<any>(this.baseUrl+'api/profil-action').pipe(
       map(
         profilactionData => {
          return profilactionData;
         }));
  }

  updateProfilActionAllowed(id: string): Observable<ProfilAction> {
    return this.http.get<ProfilAction>(this.baseUrl +'api/profil-action/'+id+'/allowed');
  }

  getProfilAction(profil: string, action: string ) {
      return this.http.get<boolean>(this.baseUrl+'api/profil-action/'+profil+'/profil/'+action+'/action/allowed').pipe(
       map(
         profilactionData => {
          return profilactionData;
         }));
  }

  getProfilActionRole(profil: string) {
      return this.http.get<any>(this.baseUrl+'api/profil-action/'+profil+'/profil/allowed').pipe(
       map(
         profilactionData => {
          return profilactionData;
         }));
  }
}
