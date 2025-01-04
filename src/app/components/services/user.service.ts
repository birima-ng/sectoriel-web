import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { User } from '../modeles/user.modele';
import { ChangePasswordDTO } from '../modeles/change-passworddto.modele';
import { RMessage } from '../modeles/rmessage.modele';
import { PasswordChange } from '../modeles/changepassword.modele';
import { Result } from '../modeles/result.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class UserService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl +'api/user/'+ id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl+'api/user', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl+'api/user/'+ user.id, User);
  }


  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.baseUrl +'api/user/'+ id);
  }

  getUsers() {
      return this.http.get<any>(this.baseUrl+'api/user').pipe(
       map(
         userData => {
          return userData;
         }));
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.baseUrl +'api/user/'+username+'/username');
  }

  getUsersOrganization(id: string) {
      return this.http.get<any>(this.baseUrl+'api/user/'+id+'/organization').pipe(
       map(
         userData => {
          return userData;
         }));
  }

  changePassword(passwordchange: PasswordChange):Observable<Result> {
    return this.http.post<Result>(this.baseUrl+'api/user/password-change', passwordchange);
  }

  findUerByUsername(user: User):Observable<Result> {
    return this.http.post<Result>(this.baseUrl+'api/user/userbyusername', user);
  }

  getUserActivate(phone: string,num_ag: string): Observable<RMessage> {
    return this.http.get<RMessage>(this.baseUrl +'api/user/'+ phone +'/'+num_ag+'/activate');
  }

  getUsersAgency() {
      return this.http.get<any>(this.baseUrl+'api/user-agency').pipe(
       map(
         userData => {
          return userData;
         }));
  }

  getUsersProducer() {
      return this.http.get<any>(this.baseUrl+'api/user-producer').pipe(
       map(
         userData => {
          return userData;
         }));
  }

  updateUserAdmin(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl+'api/user/admin', user);
  }

  activate(token: string): Observable<any> {
    return this.http.get(this.baseUrl+'activate', { params: { token } });
  }
  getUsersByOrganissationnelle(id: string) {
      return this.http.get<any>(this.baseUrl+'api/user/'+id+'/organisationnelle').pipe(
       map(
         organisationnelleData => {
          return organisationnelleData;
         }));
  }

  getUserByCodeactivationAndToken(codeactivation: string, token: string) {
      return this.http.get<any>(this.baseUrl+'api/user/codeactivation/'+codeactivation+'/token/'+token).pipe(
       map(
         organisationnelleData => {
          return organisationnelleData;
         }));
  }

  changePasswordUser(cpassword: ChangePasswordDTO):Observable<Result> {
    return this.http.post<Result>(this.baseUrl+'api/user/change-password', cpassword);
  }

}
