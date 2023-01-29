import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./modules/menu/menu-root.component').then(
        m => m.MenuRootComponent
      ),
  },
  {
    path: 'shoppingcart',
    loadComponent: () =>
      import('./modules/shopping-cart/shopping-cart-dialog.component').then(
        m => m.ShoppingCartDialogComponent
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./modules/orders/orders.component').then(m => m.OrdersComponent),
  },
];
