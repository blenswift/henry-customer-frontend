import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'menu/:qrcode',
    loadComponent: () => import('./modules/redirect/redirect.component'),
  },
  {
    path: 'menu/:qrcode/:restaurantId',
    loadComponent: () => import('./modules/menu/menu-root.component'),
  },
  {
    path: 'shoppingcart/:qrcode/:restaurantId',
    loadComponent: () => import('./modules/shopping-cart/shopping-cart-dialog.component'),
  },
  {
    path: 'orders',
    loadComponent: () => import('./modules/orders/orders.component'),
  },
  {
    path: 'order-details/:trackingId/:qrcode/:restaurantId',
    loadComponent: () => import('./modules/order-detail/order-detail.component'),
  },
  {
    path: 'checkout/:id/:gatewayMerchantId',
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
