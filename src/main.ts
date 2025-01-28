// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide router
    provideHttpClient(withFetch()), 
    importProvidersFrom(RouterModule.forRoot(routes))
  ],
}).catch((err) => console.error(err));
