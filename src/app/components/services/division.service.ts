import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Division} from 'app/components/modeles/division.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
@Injectable({
providedIn: 'root'
})
export class DivisionService {
baseUrl: string = environment.apiUrl+"api/division";

constructor(private http: HttpClient) { }

  getAllDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(this.baseUrl);
  }

  getDivisionById(id: number): Observable<Division> {
    return this.http.get<Division>(`${this.baseUrl}/${id}`);
  }

  getRootDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.baseUrl}/root`);
  }

  getChildrenOfDivision(parentId: number): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.baseUrl}/${parentId}/children`);
  }


  createDivision(division: Division): Observable<Division> {
    return this.http.post<Division>(this.baseUrl, division);
  }

  getDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.baseUrl}`);
  }

  getDivisionsNomap() {
    return this.http.get<Division[]>(`${this.baseUrl}/nomap`);
  }
}




