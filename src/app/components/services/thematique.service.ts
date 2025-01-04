import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Thematique} from "../modeles/thematique.modele";

@Injectable({
providedIn: 'root'
})
export class ThematiqueService{
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getThematiqueById(id: string): Observable<Thematique> {
    return this.http.get<Thematique>(this.baseUrl +'api/thematique/'+ id);
  }

  createThematique(thematique: Thematique): Observable<Thematique> {
    return this.http.post<Thematique>(this.baseUrl+'api/thematique', thematique);
  }

  updateThematique(thematique: Thematique): Observable<Thematique> {
    return this.http.put<Thematique>(this.baseUrl +'api/thematique/'+ thematique.id, thematique);
  }

  deleteThematique(id: string): Observable<Thematique> {
    return this.http.delete<Thematique>(this.baseUrl +'api/thematique/'+ id);
  }

  getThematiques() {
      return this.http.get<any>(this.baseUrl+'api/thematique').pipe(
       map(
         thematiqueData => {
          return thematiqueData;
         }));
  }
}
