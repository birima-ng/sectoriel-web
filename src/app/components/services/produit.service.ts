import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Produit} from "../modeles/produit.modele";

@Injectable({
providedIn: 'root'
})
export class ProduitService{
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getProduitById(id: string): Observable<Produit> {
    return this.http.get<Produit>(this.baseUrl +'api/produit/'+ id);
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.baseUrl+'api/produit', produit);
  }

  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.baseUrl +'api/produit/'+ produit.id, produit);
  }

  deleteProduit(id: string): Observable<Produit> {
    return this.http.delete<Produit>(this.baseUrl +'api/produit/'+ id);
  }

  getProduits() {
      return this.http.get<any>(this.baseUrl+'api/produit').pipe(
       map(
         produitData => {
          return produitData;
         }));
  }
}
