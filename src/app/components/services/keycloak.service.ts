import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance } from 'keycloak-js';

@Injectable({
providedIn: 'root'
})
export class KeycloakService {
private keycloak: KeycloakInstance;

constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'mon-realm',
      clientId: 'angular-client'
    });
  }

  init(): Promise<boolean> {
    return this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    });
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  logout(): void {
    this.keycloak.logout();
  }

  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.preferred_username;
  }
}
