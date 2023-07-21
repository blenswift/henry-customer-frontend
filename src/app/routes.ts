import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'menu/:qrcode',
    loadComponent: () => import('./modules/menu/menu-root.component'),
  },
  {
    path: 'shoppingcart',
    loadComponent: () => import('./modules/shopping-cart/shopping-cart-dialog.component'),
  },
  {
    path: 'orders',
    loadComponent: () => import('./modules/orders/orders.component'),
  },
  {
    path: 'order-details/:trackingId',
    loadComponent: () => import('./modules/order-detail/order-detail.component'),
  },
  {
    path: 'checkout/:id',
    loadComponent: () => import('./modules/checkout/checkout.component'),
  },
  {
    path: 'notfound',
    loadComponent: () => import('./modules/not-found/not-found.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./modules/scaninfo/scaninfo.component'),
  },
];
