import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Structure} from "../modeles/structure.modele";
@Injectable({
providedIn: 'root'
})
export class StructureService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getStructureById(id: string): Observable<Structure> {
    return this.http.get<Structure>(this.baseUrl +'api/structure/'+ id);
  }

  createStructure(structure: Structure): Observable<Structure> {
    return this.http.post<Structure>(this.baseUrl+'api/structure', structure);
  }

  updateStructure(structure: Structure): Observable<Structure> {
    return this.http.put<Structure>(this.baseUrl +'api/structure/'+ structure.id, structure);
  }

  deleteStructure(id: string): Observable<Structure> {
    return this.http.delete<Structure>(this.baseUrl +'api/structure/'+ id);
  }

  getStructures() {
      return this.http.get<any>(this.baseUrl+'api/structure').pipe(
       map(
         structureData => {
          return structureData;
         }));
  }

  getStructurePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/structure-page?page='+page+'&size='+size);
  }
}
