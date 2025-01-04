import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { FichierJoint } from 'app/components/modeles/fichier-joint.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class FichierJointService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getFichierJointById(id: string): Observable<FichierJoint> {
    return this.http.get<FichierJoint>(this.baseUrl +'api/fichier-joint/'+ id);
  }

  createFichierJoint(fichierjoint: FichierJoint): Observable<FichierJoint> {
    return this.http.post<FichierJoint>(this.baseUrl+'api/fichier-joint', fichierjoint);
  }

  updateFichierJoint(fichierjoint: FichierJoint): Observable<FichierJoint> {
    return this.http.put<FichierJoint>(this.baseUrl +'api/fichier-joint/'+fichierjoint.id, fichierjoint);
  }

  deleteFichierJoint(id: string): Observable<FichierJoint> {
    return this.http.delete<FichierJoint>(this.baseUrl +'api/fichier-joint/'+ id);
  }

  getFichierJoints() {
      return this.http.get<any>(this.baseUrl+'api/fichier-joint').pipe(
       map(
         fichierjointData => {
          return fichierjointData;
         }));
  }
  getAllPage(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl +'page/fichier-joint/', { params });
  }

  getFichierJointByCourierId(id: string) {
      return this.http.get<any>(this.baseUrl+'api/fichier-joint/'+id+'/courrier').pipe(
       map(
         fichierjointData => {
          return fichierjointData;
         }));
  }
}
