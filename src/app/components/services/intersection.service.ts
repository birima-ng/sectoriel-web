import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Intersection} from 'app/components/modeles/intersection.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class IntersectionService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getIntersectionById(id: string): Observable<Intersection> {
    return this.http.get<Intersection>(this.baseUrl +'api/intersection/'+ id);
  }

  createIntersection(intersection: Intersection): Observable<Intersection> {
    return this.http.post<Intersection>(this.baseUrl+'api/intersection', intersection);
  }

  updateIntersection(intersection: Intersection): Observable<Intersection> {
    return this.http.put<Intersection>(this.baseUrl +'api/intersection/'+ intersection.id, intersection);
  }

  deleteIntersection(id: string): Observable<Intersection> {
    return this.http.delete<Intersection>(this.baseUrl +'api/intersection/'+ id);
  }

  getIntersections() {
      return this.http.get<any>(this.baseUrl+'api/intersection').pipe(
       map(
         intersectionData => {
          return intersectionData;
         }));
  }
}
