import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {NatureDocument} from "../modeles/nature-document.modele";

@Injectable({
providedIn: 'root'
})
export class NatureDocumentService{
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getNatureDocumentById(id: string): Observable<NatureDocument> {
    return this.http.get<NatureDocument>(this.baseUrl +'api/nature-document/'+ id);
  }

  createNatureDocument(naturedocument: NatureDocument): Observable<NatureDocument> {
    return this.http.post<NatureDocument>(this.baseUrl+'api/nature-document', naturedocument);
  }

  updateNatureDocument(naturedocument: NatureDocument): Observable<NatureDocument> {
    return this.http.put<NatureDocument>(this.baseUrl +'api/nature-document/'+ naturedocument.id, naturedocument);
  }

  deleteNatureDocument(id: string): Observable<NatureDocument> {
    return this.http.delete<NatureDocument>(this.baseUrl +'api/nature-document/'+ id);
  }

  getNatureDocuments() {
      return this.http.get<any>(this.baseUrl+'api/nature-document').pipe(
       map(
         naturedocumentData => {
          return naturedocumentData;
         }));
  }
}
