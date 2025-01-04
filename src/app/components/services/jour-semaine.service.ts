import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {JourSemaine} from 'app/components/modeles/jour-semaine.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class JourSemaineService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getJourSemaineById(id: string): Observable<JourSemaine> {
    return this.http.get<JourSemaine>(this.baseUrl +'api/jour-semaine/'+ id);
  }

  createJourSemaine(joursemaine: JourSemaine): Observable<JourSemaine> {
    return this.http.post<JourSemaine>(this.baseUrl+'api/jour-semaine', joursemaine);
  }

  updateJourSemaine(joursemaine: JourSemaine): Observable<JourSemaine> {
    return this.http.put<JourSemaine>(this.baseUrl +'api/jour-semaine/'+ joursemaine.id, joursemaine);
  }

  deleteJourSemaine(id: string): Observable<JourSemaine> {
    return this.http.delete<JourSemaine>(this.baseUrl +'api/jour-semaine/'+ id);
  }

  getJourSemaines() {
      return this.http.get<any>(this.baseUrl+'api/jour-semaine').pipe(
       map(
         joursemaineData => {
          return joursemaineData;
         }));
  }
}
