import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { KeycloakService } from 'app/components/services/keycloak.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);


const keycloakService = new KeycloakService();

keycloakService.init().then(authenticated => {
  if (authenticated) {
    import('./app/app.module').then(({ AppModule }) => {
      platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));
    });
  } else {
    window.location.reload();
  }
});
