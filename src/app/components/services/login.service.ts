import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
export class User{

constructor(
    public status:string,
     ) {}

}

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}

}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = environment.apiUrl;
  constructor(
    private httpClient:HttpClient
  ) {
     }

     authenticate(username:string, password:string) {
      return this.httpClient.post<any>(this.baseUrl+'authenticate',{username,password}).pipe(
       map(
         userData => {
console.log("############################################ "+ userData);

          return userData;
         }, error => {
console.log("############################################ error error "+ error);
}
)
);
}

isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }


 private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
