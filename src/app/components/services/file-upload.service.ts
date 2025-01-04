import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
providedIn: 'root'
})
export class FileUploadService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getFile(idfile: string) {
    return this.http.get(`${this.baseUrl}api/upload/doc/${idfile}`, {
      responseType: 'blob', // Important pour gérer les fichiers binaires
    });
  }

  uploadDocument(file: File,iddocument: string): Observable<HttpEvent<any>> {
console.log("################# iddocument",iddocument);
console.log("################# file",file);
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('iddocument', iddocument);
    const req = new HttpRequest('POST', `${this.baseUrl}api/upload/document`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadFileCourrier(file: File,idcourrier: string): Observable<HttpEvent<any>> {
console.log("################# iddocument",idcourrier);
console.log("################# file",file);
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('idcourrier', idcourrier);
    const req = new HttpRequest('POST', `${this.baseUrl}api/upload/fichier`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadSarre(file: File,idbaac: string): Observable<HttpEvent<any>> {
console.log("################# IDBAAC",idbaac);
console.log("################# file",file);
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('idbaac', idbaac);
    const req = new HttpRequest('POST', `${this.baseUrl}api/upload/baac`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  upload(file: File,idcultivar: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('idcultivar', idcultivar);
    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadCover(file: File,iduser: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('iduser', iduser);
    const req = new HttpRequest('POST', `${this.baseUrl}upload/file-cover`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadProfil(file: File,iduser: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('iduser', iduser);
    const req = new HttpRequest('POST', `${this.baseUrl}upload/file-profil`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.baseUrl+'files');
  }

  uploadFileVariety(file: File,id: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    const req = new HttpRequest('POST', `${this.baseUrl}upload/file-variety`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
