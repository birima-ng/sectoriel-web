import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let authToken = localStorage.getItem('access_token');
console.log("valeur token");
console.log(authToken);


if (authToken==null) {
//config birima
 this.router.navigate(['/pages/login']);
} else {
let expired=this.tokenExpired(authToken);
if (!authToken||expired) {
     // window.alert("Access not allowed!");
      // this.router.navigate(['/login'])
      this.router.navigate(['/pages/login'])
//config birima
    }
}
    return true;
  }

tokenIsExpired() {
if (this.tokenExpired(localStorage.getItem('access_token'))) {
return true;
  } else {
return false;
  }
  }

private tokenExpired(token: string) {
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

}
