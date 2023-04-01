import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products/:qrcode',
    loadComponent: () => import('./modules/menu/menu-root.component').then(m => m.MenuRootComponent),
  },
  {
    path: 'shoppingcart',
    loadComponent: () => import('./modules/shopping-cart/shopping-cart-dialog.component').then(m => m.ShoppingCartDialogComponent),
  },
  {
    path: 'orders',
    loadComponent: () => import('./modules/orders/orders.component').then(m => m.OrdersComponent),
  },
  {
    path: 'order-details/:trackingId',
    loadComponent: () => import('./modules/order-detail/order-detail.component').then(m => m.OrderDetailComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./modules/scaninfo/scaninfo.component').then(m => m.ScaninfoComponent),
  },
];
