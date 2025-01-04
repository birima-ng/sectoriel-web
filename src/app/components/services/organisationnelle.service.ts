import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Organisationnelle} from 'app/components/modeles/organisationnelle.modele';
import {OrganisationDto} from 'app/components/modeles/organisationdto.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
@Injectable({
providedIn: 'root'
})
export class OrganisationnelleService {
baseUrl: string = environment.apiUrl+"api/organisationnelle";

constructor(private http: HttpClient) { }

  getAllOrganisationnelles(): Observable<Organisationnelle[]> {
    return this.http.get<Organisationnelle[]>(this.baseUrl);
  }

  getOrganisationnelleById(id: number): Observable<Organisationnelle> {
    return this.http.get<Organisationnelle>(`${this.baseUrl}/${id}`);
  }

  getRootOrganisationnelles(): Observable<Organisationnelle[]> {
    return this.http.get<Organisationnelle[]>(`${this.baseUrl}/root`);
  }

  getChildrenOfOrganisationnelle(parentId: number): Observable<Organisationnelle[]> {
    return this.http.get<Organisationnelle[]>(`${this.baseUrl}/${parentId}/children`);
  }


  createOrganisationnelle(organisationnelle: OrganisationDto): Observable<Organisationnelle> {
    return this.http.post<Organisationnelle>(this.baseUrl, organisationnelle);
  }

  getOrganisationnelles(): Observable<Organisationnelle[]> {
    return this.http.get<Organisationnelle[]>(`${this.baseUrl}`);
  }

  getOrganisationnellesNomap() {
    return this.http.get<Organisationnelle[]>(`${this.baseUrl}/nomap`);
  }

  deleteOrganisationnelle(id: string): Observable<OrganisationDto> {
    return this.http.delete<OrganisationDto>(this.baseUrl +'/'+ id);
  }
}




