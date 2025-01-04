import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Contact} from 'app/components/modeles/contact.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class ContactService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(this.baseUrl +'api/contact/'+ id);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl+'api/contact', contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.baseUrl +'api/contact/'+ contact.id, contact);
  }

  deleteContact(id: string): Observable<Contact> {
    return this.http.delete<Contact>(this.baseUrl +'api/contact/'+ id);
  }

  getContacts() {
      return this.http.get<any>(this.baseUrl+'api/contact').pipe(
       map(
         contactData => {
          return contactData;
         }));
  }

  getContactByFonction(id: string) {
      return this.http.get<any>(this.baseUrl+'api/contact/'+id+'/fonction').pipe(
       map(
         contactData => {
          return contactData;
         }));
  }

  getContactByServiceDepartement(id: string) {
      return this.http.get<any>(this.baseUrl+'api/contact/'+id+'/service-departement').pipe(
       map(
         contactData => {
          return contactData;
         }));
  }

}
