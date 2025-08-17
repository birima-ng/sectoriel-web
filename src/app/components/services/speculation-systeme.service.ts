import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {SpeculationSysteme} from "../modeles/speculation-systeme.modele";
@Injectable({
providedIn: 'root'
})
export class SpeculationSystemeService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getSpeculationSystemeById(id: string): Observable<SpeculationSysteme> {
    return this.http.get<SpeculationSysteme>(this.baseUrl +'api/speculation-systeme/'+ id);
  }

  createSpeculationSysteme(speculationsysteme: SpeculationSysteme): Observable<SpeculationSysteme> {
    return this.http.post<SpeculationSysteme>(this.baseUrl+'api/speculation-systeme', speculationsysteme);
  }

  updateSpeculationSysteme(speculationsysteme: SpeculationSysteme): Observable<SpeculationSysteme> {
    return this.http.put<SpeculationSysteme>(this.baseUrl +'api/speculation-systeme/'+ speculationsysteme.id, speculationsysteme);
  }

  deleteSpeculationSysteme(id: string): Observable<SpeculationSysteme> {
    return this.http.delete<SpeculationSysteme>(this.baseUrl +'api/speculation-systeme/'+ id);
  }

  getSpeculationSystemes() {
      return this.http.get<any>(this.baseUrl+'api/speculation-systeme').pipe(
       map(
         speculationsystemeData => {
          return speculationsystemeData;
         }));
  }

  getSpeculationSystemePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/speculation-systeme-page?page='+page+'&size='+size);
  }

  getSpeculationSystemePageConfigures(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/speculation-systeme-page/isconfigured?page='+page+'&size='+size);
  }

  getSpeculationSystemePageConfigureFalses(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/speculation-systeme-page/notconfigured?page='+page+'&size='+size);
  }

  updateSpeculationSystemeconfiguration(speculations: any): Observable<any> {
     return this.http.post<any>(this.baseUrl+'api/speculation-systeme/configuration',speculations);
  }

  updateSpeculationSystemeDetache(speculationsysteme: SpeculationSysteme): Observable<SpeculationSysteme> {
    return this.http.put<SpeculationSysteme>(this.baseUrl +'api/speculation-systeme/detache/'+ speculationsysteme.id, speculationsysteme);
  }

}
