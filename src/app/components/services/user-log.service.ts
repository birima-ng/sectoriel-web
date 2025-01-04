import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {UserLog} from 'app/components/modeles/user-log.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class UserLogService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getUserLogById(id: string): Observable<UserLog> {
    return this.http.get<UserLog>(this.baseUrl +'api/userlog/'+ id);
  }

  createUserLog(userlog: UserLog): Observable<UserLog> {
    return this.http.post<UserLog>(this.baseUrl+'api/userlog', userlog);
  }

  updateUserLog(userlog: UserLog): Observable<UserLog> {
    return this.http.put<UserLog>(this.baseUrl +'api/userlog/'+ userlog.id, userlog);
  }

  deleteUserLog(id: string): Observable<UserLog> {
    return this.http.delete<UserLog>(this.baseUrl +'api/userlog/'+ id);
  }

  getUserLogs() {
      return this.http.get<any>(this.baseUrl+'api/user-log').pipe(
       map(
         userlogData => {
          return userlogData;
         }));
  }
}
