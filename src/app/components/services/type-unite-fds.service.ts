import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {TypeUniteFds} from 'app/components/modeles/type-unite-fds.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class TypeUniteFdsService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getTypeUniteFdsById(id: string): Observable<TypeUniteFds> {
    return this.http.get<TypeUniteFds>(this.baseUrl +'api/type-unite-fds/'+ id);
  }

  createTypeUniteFds(typeunitefds: TypeUniteFds): Observable<TypeUniteFds> {
    return this.http.post<TypeUniteFds>(this.baseUrl+'api/type-unite-fds', typeunitefds);
  }

  updateTypeUniteFds(typeunitefds: TypeUniteFds): Observable<TypeUniteFds> {
    return this.http.put<TypeUniteFds>(this.baseUrl +'api/type-unite-fds/'+ typeunitefds.id, typeunitefds);
  }

  deleteTypeUniteFds(id: string): Observable<TypeUniteFds> {
    return this.http.delete<TypeUniteFds>(this.baseUrl +'api/type-unite-fds/'+ id);
  }

  getTypeUniteFdss() {
      return this.http.get<any>(this.baseUrl+'api/type-unite-fds').pipe(
       map(
         typeunitefdsData => {
          return typeunitefdsData;
         }));
  }

  getTypeUniteFdsByUniteOrganisationnelle(id: string) {
      return this.http.get<any>(this.baseUrl+'api/type-unite-fds/'+id+'/unite-organisationnelle').pipe(
       map(
         unitefdsData => {
          return unitefdsData;
         }));
  }
}
