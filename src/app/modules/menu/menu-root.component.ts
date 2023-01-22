import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { filter, map } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ProductToShoppingCartDialogComponent } from './components/product-to-shopping-cart-dialog/product-to-shopping-cart-dialog.component';
import { MenuService } from './services/menu.service';
import { RestaurantService } from './services/restaurant.service';

@Component({
  selector: 'oxp-menu-root',
  standalone: true,
  imports: [
    CommonModule,
    MenuListComponent,
    MenuHeaderComponent,
    MatDialogModule,
    MatRadioModule,
  ],
  templateUrl: './menu-root.component.html',
  styleUrls: ['./menu-root.component.scss'],
})
export class MenuRootComponent {
  menu$ = this.menuService
    .getMenu('55c410d0-3abb-442e-855c-d13dd04018a9', 'de')
    .pipe(
      map(menu => {
        menu.categories[0].selected = true;
        return menu;
      })
    );

  restaurant$ = this.restaurantService.getRestaurant(
    '55c410d0-3abb-442e-855c-d13dd04018a9'
  );

  constructor(
    private dialog: MatDialog,
    public shoppingcartService: ShoppingCartService,
    private menuService: MenuService,
    private restaurantService: RestaurantService
  ) {}

  openProductModal(product: Product) {
    const dialogRef = this.dialog.open(ProductToShoppingCartDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: product,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(x => x))
      .subscribe((result: Product) => {
        this.shoppingcartService.add(result);
      });
  }

  categoryClicked(category: Category) {
    category.selected = true;
  }
}
