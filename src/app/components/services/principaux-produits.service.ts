import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {PrincipauxProduits} from "../modeles/principaux-produits.modele";
@Injectable({
providedIn: 'root'
})
export class PrincipauxProduitsService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getPrincipauxProduitsById(id: string): Observable<PrincipauxProduits> {
    return this.http.get<PrincipauxProduits>(this.baseUrl +'api/principaux-produits/'+ id);
  }

  createPrincipauxProduits(principauxproduits: PrincipauxProduits): Observable<PrincipauxProduits> {
    return this.http.post<PrincipauxProduits>(this.baseUrl+'api/principaux-produits', principauxproduits);
  }

  updatePrincipauxProduits(principauxproduits: PrincipauxProduits): Observable<PrincipauxProduits> {
    return this.http.put<PrincipauxProduits>(this.baseUrl +'api/principaux-produits/'+ principauxproduits.id, principauxproduits);
  }

  deletePrincipauxProduits(id: string): Observable<PrincipauxProduits> {
    return this.http.delete<PrincipauxProduits>(this.baseUrl +'api/principaux-produits/'+ id);
  }

  getPrincipauxProduitss() {
      return this.http.get<any>(this.baseUrl+'api/principaux-produits').pipe(
       map(
         principauxproduitsData => {
          return principauxproduitsData;
         }));
  }

  getPrincipauxProduitsPages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/principaux-produits-page?page='+page+'&size='+size);
  }

  getPrincipauxProduitsPageConfigures(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/principaux-produits-page/isconfigured?page='+page+'&size='+size);
  }

  getPrincipauxProduitsPageConfigureFalses(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/principaux-produits-page/notconfigured?page='+page+'&size='+size);
  }

  updatePrincipauxProduitsconfiguration(speculations: any): Observable<any> {
     return this.http.post<any>(this.baseUrl+'api/principaux-produits/configuration',speculations);
  }

  updatePrincipauxProduitsDetache(principauxproduits: PrincipauxProduits): Observable<PrincipauxProduits> {
    return this.http.put<PrincipauxProduits>(this.baseUrl +'api/principaux-produits/detache/'+ principauxproduits.id, principauxproduits);
  }

}
