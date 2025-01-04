import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {TypeChargement} from 'app/components/modeles/type-chargement.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {GenreVehicule} from "../modeles/genre-vehicule.modele";
@Injectable({
providedIn: 'root'
})
export class GenreVehiculeService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getGenreVehiculeById(id: string): Observable<GenreVehicule> {
    return this.http.get<GenreVehicule>(this.baseUrl +'api/genre-vehicule/'+ id);
  }

  createGenreVehicule(genrevehicule: GenreVehicule): Observable<GenreVehicule> {
    return this.http.post<GenreVehicule>(this.baseUrl+'api/genre-vehicule', genrevehicule);
  }

  updateGenreVehicule(genrevehicule: GenreVehicule): Observable<GenreVehicule> {
    return this.http.put<GenreVehicule>(this.baseUrl +'api/genre-vehicule/'+ genrevehicule.id, genrevehicule);
  }

  deleteGenreVehicule(id: string): Observable<GenreVehicule> {
    return this.http.delete<GenreVehicule>(this.baseUrl +'api/genre-vehicule/'+ id);
  }

  getGenreVehicules() {
      return this.http.get<any>(this.baseUrl+'api/genre-vehicule').pipe(
       map(
         genrevehiculeData => {
          return genrevehiculeData;
         }));
  }
}
