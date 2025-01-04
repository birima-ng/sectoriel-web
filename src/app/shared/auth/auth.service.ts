import { Injectable, VERSION, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {ProfilActionService} from 'app/components/services/profil-action.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Injectable({
providedIn: 'root'
})

export class AuthService {
endpoint: string = 'http://localhost:8080/';
headers = new HttpHeaders().set('Content-Type', 'application/json');
currentUser = {};

constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    public router: Router,
    public toastr: ToastrService,
    public profilactionService: ProfilActionService,
  ) {
  }

signIn(username:string, password:string) {
    return this.http.post<any>(this.endpoint+'authenticate',{username,password})
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
      /*  this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        })*/
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  tokenIsExpired() {
console.log("localStorage.getItem(access_token) ",localStorage.getItem('access_token'));
  //  return localStorage.getItem('access_token');
if (this.tokenExpired(localStorage.getItem('access_token') || '{}')) {
    // token expired
return true;
  } else {
    // token valid
return false;
  }
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
localStorage.removeItem('username');
localStorage.removeItem('organization');
localStorage.removeItem('user_password');
localStorage.removeItem('user_firstname');
localStorage.removeItem('user_lastname');
localStorage.removeItem('currentUser');
localStorage.removeItem('user_email');
localStorage.removeItem('currentAgent');
localStorage.removeItem('profile');
localStorage.removeItem('produceradmin');
this.removeParam();
let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      window.location.reload();
      this.router.navigate(['/']);
    }
  }

// Error
handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


private tokenExpired(token: string) {
console.log("localStorage.getItem(access_token) ",token);
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

isUserLogin(): boolean {
    let authToken = localStorage.getItem('access_token');
if(authToken !== null) {
    let expiredToken=this.tokenExpired(authToken);
    //return (authToken !== null&&!expiredToken) ? true : false;
if(authToken !== null&&!expiredToken){

      return true;
}else {
this.removeParam();
      return false;
}
}else{
this.removeParam();
return false;
}
  }

removeParam() {
localStorage.removeItem('username');
localStorage.removeItem('organization');
localStorage.removeItem('user_password');
localStorage.removeItem('user_firstname');
localStorage.removeItem('user_lastname');
localStorage.removeItem('currentUser');
localStorage.removeItem('user_email');
localStorage.removeItem('currentAgent');
localStorage.removeItem('profile');
localStorage.removeItem('access_token');
localStorage.removeItem('user_id');
localStorage.removeItem('agent');
localStorage.removeItem('produceradmin');
}

   hasPermission(permission: string): boolean {
    const actionsJson = localStorage.getItem('roles');
    const actions: string[] = JSON.parse(actionsJson);
    return actions.includes(permission);
  }

}
