import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
constructor(private authService: AuthService) { }

/*    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
if (authToken) {
       const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + authToken)
      });
      return next.handle(cloned);
}
    else {
      return next.handle(req);
    }
    }
*/
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token JWT depuis le service d'authentification
    let token =  this.authService.getToken();

    // Cloner la requête et ajouter le token dans l'en-tête Authorization
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
