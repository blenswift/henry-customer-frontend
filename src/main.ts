import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes';

initializeApp({
  apiKey: 'AIzaSyAgkrR4Wyr9yl3pKjNdWm8vl1zKi1hOYAE',
  authDomain: 'orderxpay-b8fc3.firebaseapp.com',
  projectId: 'orderxpay-b8fc3',
  storageBucket: 'orderxpay-b8fc3.appspot.com',
  messagingSenderId: '577111004701',
  appId: '1:577111004701:web:581366d2d9aa478be398f4',
});

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([
      ServiceWorkerModule.register('/firebase-messaging-sw.js', { enabled: true }),
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
  ],
}).catch(err => console.error(err));
