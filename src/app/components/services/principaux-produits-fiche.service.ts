import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {PrincipauxProduitsFiche} from "../modeles/principaux-produits-fiche.modele";
@Injectable({
providedIn: 'root'
})
export class PrincipauxProduitsFicheService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getPrincipauxProduitsFicheById(id: string): Observable<PrincipauxProduitsFiche> {
    return this.http.get<PrincipauxProduitsFiche>(this.baseUrl +'api/principaux-produits-fiche/'+ id);
  }

  createPrincipauxProduitsFiche(principauxproduitsfiche: PrincipauxProduitsFiche): Observable<PrincipauxProduitsFiche> {
    return this.http.post<PrincipauxProduitsFiche>(this.baseUrl+'api/principaux-produits-fiche', principauxproduitsfiche);
  }

  updatePrincipauxProduitsFiche(principauxproduitsfiche: PrincipauxProduitsFiche): Observable<PrincipauxProduitsFiche> {
    return this.http.put<PrincipauxProduitsFiche>(this.baseUrl +'api/principaux-produits-fiche/'+ principauxproduitsfiche.id, principauxproduitsfiche);
  }

  deletePrincipauxProduitsFiche(id: string): Observable<PrincipauxProduitsFiche> {
    return this.http.delete<PrincipauxProduitsFiche>(this.baseUrl +'api/principaux-produits-fiche/'+ id);
  }

  getPrincipauxProduitsFiches() {
      return this.http.get<any>(this.baseUrl+'api/principaux-produits-fiche').pipe(
       map(
         principauxproduitsficheData => {
          return principauxproduitsficheData;
         }));
  }

  getPrincipauxProduitsFichePages(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/principaux-produits-fiche-page?page='+page+'&size='+size);
  }

  getPrincipauxProduitsFichePageConfigures(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/principaux-produits-fiche-page/isconfigured?page='+page+'&size='+size);
  }

  getPrincipauxProduitsFichePageConfigureFalses(page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/principaux-produits-fiche-page/notconfigured?page='+page+'&size='+size);
  }

  updatePrincipauxProduitsFicheconfiguration(speculations: any): Observable<any> {
     return this.http.post<any>(this.baseUrl+'api/principaux-produits-fiche/configuration',speculations);
  }

  updatePrincipauxProduitsFicheDetache(principauxproduitsfiche: PrincipauxProduitsFiche): Observable<PrincipauxProduitsFiche> {
    return this.http.put<PrincipauxProduitsFiche>(this.baseUrl +'api/principaux-produits-fiche/detache/'+ principauxproduitsfiche.id, principauxproduitsfiche);
  }

  getPrincipauxProduitsFicheBySpeculationAndTypeFiche(speculation: string, typefiche: string): Observable<PrincipauxProduitsFiche> {
    return this.http.get<PrincipauxProduitsFiche>(this.baseUrl +'api/principaux-produits-fiche/'+ speculation+'/speculation/'+typefiche+'/type-fiche-collecte');
  }

  getPrincipauxProduitsFichePageTypeFicheConfigured(idtypefiche: string, page: number, size: number): Observable<any> {
     return this.http.get<any>(this.baseUrl+'api/principaux-produits-fiche-page/'+idtypefiche+'/type-fiche-collecte?page='+page+'&size='+size);
  }
}
