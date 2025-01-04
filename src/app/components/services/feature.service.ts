import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Feature} from 'app/components/modeles/feature.modele';
import {FeatureDTO} from 'app/components/modeles/feature-dto.modele';
import {FeatureProfilActionDTO} from 'app/components/modeles/feature-profil-dto.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class FeatureService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getFeatureById(id: string): Observable<Feature> {
    return this.http.get<Feature>(this.baseUrl +'api/feature/'+ id);
  }

  createFeature(feature: Feature): Observable<Feature> {
    return this.http.post<Feature>(this.baseUrl+'api/feature', feature);
  }

  updateFeature(feature: Feature): Observable<Feature> {
    return this.http.put<Feature>(this.baseUrl +'api/feature/'+ feature.id, feature);
  }

  deleteFeature(id: string): Observable<Feature> {
    return this.http.delete<Feature>(this.baseUrl +'api/feature/'+ id);
  }

  getFeatures() {
      return this.http.get<any>(this.baseUrl+'api/feature').pipe(
       map(
         featureData => {
          return featureData;
         }));
  }

  getFeatureByModuleId(id: string): Observable<Feature[]>  {
      return this.http.get<any>(this.baseUrl+'api/feature/'+id+'/module').pipe(
       map(
         featureData => {
          return featureData;
         }));
  }

  getFeaturesDto(): Observable<FeatureDTO[]>  {
      return this.http.get<any>(this.baseUrl+'api/feature/dto').pipe(
       map(
         featureData => {
          return featureData;
         }));
  }

  getFeaturesDtoModuleId(id: string): Observable<FeatureDTO[]>  {
      return this.http.get<any>(this.baseUrl+'api/feature/dto/'+id+'/module').pipe(
       map(
         featureData => {
          return featureData;
         }));
  }

  getFeatureProfilActionsDtoModuleId(id: string, profil: string): Observable<FeatureProfilActionDTO[]>  {
      return this.http.get<any>(this.baseUrl+'api/feature-profil-action/dto/'+id+'/module/'+profil+'/profil').pipe(
       map(
         featureData => {
          return featureData;
         }));
  }
}
