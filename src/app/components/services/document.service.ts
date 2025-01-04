import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { Document } from 'app/components/modeles/document.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class DocumentService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getDocumentById(id: string): Observable<Document> {
    return this.http.get<Document>(this.baseUrl +'api/document/'+ id);
  }

  createDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(this.baseUrl+'api/document', document);
  }

  updateDocument(document: Document): Observable<Document> {
    return this.http.put<Document>(this.baseUrl +'api/document/'+document.id, document);
  }

  deleteDocument(id: string): Observable<Document> {
    return this.http.delete<Document>(this.baseUrl +'api/document/'+ id);
  }

  getDocuments() {
      return this.http.get<any>(this.baseUrl+'api/document').pipe(
       map(
         documentData => {
          return documentData;
         }));
  }
  getAllPage(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl +'page/document/', { params });
  }

  getDocumentByBaacId(id: string) {
      return this.http.get<any>(this.baseUrl+'api/document/'+id+'/baac').pipe(
       map(
         documentData => {
          return documentData;
         }));
  }
}
