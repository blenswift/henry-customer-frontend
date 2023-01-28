import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./app/modules/menu/menu-root.component').then(
        m => m.MenuRootComponent
      ),
  },
  {
    path: 'shoppingcart',
    loadComponent: () =>
      import('./app/modules/shopping-cart/shopping-cart-dialog.component').then(
        m => m.ShoppingCartDialogComponent
      ),
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./app/modules/payment/payment.component').then(
        m => m.PaymentComponent
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./app/modules/orders/orders.component').then(
        m => m.OrdersComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(routes),
      BrowserAnimationsModule,
      HttpClientModule,
    ]),
  ],
}).catch(err => console.error(err));
