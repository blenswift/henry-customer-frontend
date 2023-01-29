import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(routes),
      BrowserAnimationsModule,
      HttpClientModule,
    ]),
  ],
}).catch(err => console.error(err));
