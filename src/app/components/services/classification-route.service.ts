import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {ClassificationRoute} from "../modeles/classification-route.modele";
@Injectable({
providedIn: 'root'
})
export class ClassificationRouteService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getClassificationRouteById(id: string): Observable<ClassificationRoute> {
    return this.http.get<ClassificationRoute>(this.baseUrl +'api/classification-route/'+ id);
  }

  createClassificationRoute(classificationRoute: ClassificationRoute): Observable<ClassificationRoute> {
    return this.http.post<ClassificationRoute>(this.baseUrl+'api/classification-route', classificationRoute);
  }

  updateClassificationRoute(classificationRoute: ClassificationRoute): Observable<ClassificationRoute> {
    return this.http.put<ClassificationRoute>(this.baseUrl +'api/classification-route/'+ classificationRoute.id, classificationRoute);
  }

  deleteClassificationRoute(id: string): Observable<ClassificationRoute> {
    return this.http.delete<ClassificationRoute>(this.baseUrl +'api/classification-route/'+ id);
  }

  getClassificationRoutes() {
      return this.http.get<any>(this.baseUrl+'api/classification-route').pipe(
       map(
         classificationRouteData => {
          return classificationRouteData;
         }));
  }
}
