import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {StadeCommerce} from "../modeles/stade-commerce.modele";
@Injectable({
providedIn: 'root'
})
export class StadeCommerceService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getStadeCommerceById(id: string): Observable<StadeCommerce> {
    return this.http.get<StadeCommerce>(this.baseUrl +'api/stade-commerce/'+ id);
  }

  createStadeCommerce(stadecommerce: StadeCommerce): Observable<StadeCommerce> {
    return this.http.post<StadeCommerce>(this.baseUrl+'api/stade-commerce', stadecommerce);
  }

  updateStadeCommerce(stadecommerce: StadeCommerce): Observable<StadeCommerce> {
    return this.http.put<StadeCommerce>(this.baseUrl +'api/stade-commerce/'+ stadecommerce.id, stadecommerce);
  }

  deleteStadeCommerce(id: string): Observable<StadeCommerce> {
    return this.http.delete<StadeCommerce>(this.baseUrl +'api/stade-commerce/'+ id);
  }

  getStadeCommerces() {
      return this.http.get<any>(this.baseUrl+'api/stade-commerce').pipe(
       map(
         stadecommerceData => {
          return stadecommerceData;
         }));
  }
}
