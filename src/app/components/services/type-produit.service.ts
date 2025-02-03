import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {TypeProduit} from 'app/components/modeles/type-produit.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class TypeProduitService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getTypeProduitById(id: string): Observable<TypeProduit> {
    return this.http.get<TypeProduit>(this.baseUrl +'api/type-produit/'+ id);
  }

  createTypeProduit(typeproduit: TypeProduit): Observable<TypeProduit> {
    return this.http.post<TypeProduit>(this.baseUrl+'api/type-produit', typeproduit);
  }

  updateTypeProduit(typeproduit: TypeProduit): Observable<TypeProduit> {
    return this.http.put<TypeProduit>(this.baseUrl +'api/type-produit/'+ typeproduit.id, typeproduit);
  }

  deleteTypeProduit(id: string): Observable<TypeProduit> {
    return this.http.delete<TypeProduit>(this.baseUrl +'api/type-produit/'+ id);
  }

  getTypeProduits() {
      return this.http.get<any>(this.baseUrl+'api/type-produit').pipe(
       map(
         typeproduitData => {
          return typeproduitData;
         }));
  }

  getTypeProduitsByCategorie(id: string) {
      return this.http.get<any>(this.baseUrl+'api/type-produit/'+id+'/categorie').pipe(
       map(
         typeproduitData => {
          return typeproduitData;
         }));
  }
}
