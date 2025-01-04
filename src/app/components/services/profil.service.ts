import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Profil} from 'app/components/modeles/profil.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class ProfilService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getProfilById(id: string): Observable<Profil> {
    return this.http.get<Profil>(this.baseUrl +'api/profil/'+ id);
  }

  createProfil(profil: Profil): Observable<Profil> {
    return this.http.post<Profil>(this.baseUrl+'api/profil', profil);
  }

  updateProfil(profil: Profil): Observable<Profil> {
    return this.http.put<Profil>(this.baseUrl +'api/profil/'+ profil.id, profil);
  }

  deleteProfil(id: string): Observable<Profil> {
    return this.http.delete<Profil>(this.baseUrl +'api/profil/'+ id);
  }

  getProfils() {
      return this.http.get<any>(this.baseUrl+'api/profil').pipe(
       map(
         profilData => {
          return profilData;
         }));
  }
}
