import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, combineLatest, filter, map, startWith, switchMap, tap } from 'rxjs';
import { BottomNavigationComponent } from 'src/app/shared/components/bottom-navigation/bottom-navigation.component';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { ProductCart } from './../../shared/models/product-cart';
import { ShoppingCartState, ShoppingCartStore } from './../../shared/services/shopping-cart.store';
import { OrderStore } from './../orders/services/order.store';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { MenuCategoryCarouselComponent } from './components/menu-category-carousel/menu-category-carousel.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ProductToShoppingCartDialogComponent } from './components/product-to-shopping-cart-dialog/product-to-shopping-cart-dialog.component';
import { Filter, RestaurantStore } from './services/restaurant.store';

@Component({
  selector: 'oxp-menu-root',
  standalone: true,
  imports: [
    CommonModule,
    MenuHeaderComponent,
    MatDialogModule,
    MenuListComponent,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MenuCategoryCarouselComponent,
    BottomNavigationComponent,
  ],
  templateUrl: './menu-root.component.html',
  styleUrls: ['./menu-root.component.scss'],
  providers: [RestaurantStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuRootComponent {
  private restaurantStore = inject(RestaurantStore);
  private shoppingCartStore = inject(ShoppingCartStore);
  private orderStore = inject(OrderStore);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);

  filterCtrl = new FormControl('', { nonNullable: true });

  private products$ = this.route.params.pipe(
    filter(params => !!params['qrcode']),
    tap(params => sessionStorage.setItem('qrcode', params['qrcode'])),
    tap(params => this.restaurantStore.load(params['qrcode'])),
    tap(params => this.orderStore.loadCache(params['qrcode'])),
    tap(params => this.shoppingCartStore.loadCache(params['qrcode'])),
    switchMap(() => this.restaurantStore.products$)
  );

  categories$ = this.restaurantStore.categories$.pipe(
    map(categories => {
      if (categories?.length > 0) categories[0].selected = true;
      return categories;
    })
  );

  filters$ = this.restaurantStore.filters$;

  restaurant$ = this.restaurantStore.info$;
  status$ = this.restaurantStore.status$;
  orders$ = this.orderStore.orders$;
  shoppingCart$: Observable<ShoppingCartState> = this.shoppingCartStore.vm$;
  filteredProductList$ = combineLatest([this.products$, this.filterCtrl.valueChanges.pipe(startWith('')), this.filters$]).pipe(
    map(([products, filterParam, filters]) => {
      const filtersOnlyNames = filters.filter(y => y.active).map(z => z.name);
      return products.filter(
        product =>
          product.name?.toLowerCase().includes(filterParam.toLowerCase()) && filtersOnlyNames.every(elem => product.diets.includes(elem))
      );
    })
  );

  constructor(private _bottomSheet: MatBottomSheet) {}

  openProductModal(product: Product) {
    const dialogRef = this.dialog.open(ProductToShoppingCartDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { product: structuredClone(product), quantity: 1 } as ProductCart,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(x => x))
      .subscribe((result: ProductCart) => {
        this.shoppingCartStore.addItem(result);
      });
  }

  categoryClicked(category: Category) {
    const htmlElement = document.getElementById(category.id);
    if (htmlElement) {
      htmlElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  filterChanged(filters: Filter[]) {
    this.restaurantStore.updateFilters(structuredClone(filters));
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}
