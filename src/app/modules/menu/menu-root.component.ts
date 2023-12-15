import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, filter, map, startWith, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { QrCodeType } from 'src/app/shared/models/qrCodeType';
import { ToolbarBottomComponent } from '../../shared/components/toolbar-bottom/toolbar-bottom.component';
import { ProductCart } from './../../shared/models/product-cart';
import { ShoppingCartState, ShoppingCartStore } from './../../shared/services/shopping-cart.store';
import { OrderStore } from './../orders/services/order.store';
import { MenuCategoryCarouselComponent } from './components/menu-category-carousel/menu-category-carousel.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ProductToShoppingCartDialogComponent } from './components/product-to-shopping-cart-dialog/product-to-shopping-cart-dialog.component';
import { RestaurantStore } from './services/restaurant.store';

@Component({
  selector: 'oxp-menu-root',
  standalone: true,
  templateUrl: './menu-root.component.html',
  styleUrls: ['./menu-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
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
    MatButtonModule,
    TranslateModule,
    MatToolbarModule,
    ToolbarBottomComponent,
    MatButtonModule,
  ],
})
export default class MenuRootComponent {
  private restaurantStore = inject(RestaurantStore);
  private shoppingCartStore = inject(ShoppingCartStore);
  private orderStore = inject(OrderStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public translateService = inject(TranslateService);

  filterCtrl = new FormControl('', { nonNullable: true });

  private products$ = this.route.params.pipe(
    filter(params => !!params['qrcode'] && !!params['restaurantId']),
    tap(params => sessionStorage.setItem('qrcode', params['qrcode'])),
    tap(params => sessionStorage.setItem('restaurantId', params['restaurantId'])),
    tap(() => this.restaurantStore.load()),
    tap(() => this.orderStore.loadCache()),
    tap(() => this.shoppingCartStore.loadCache()),
    tap(() => this.orderStore.checkOrderStatus()),
    switchMap(() => this.restaurantStore.products$)
  );

  qrCodeType$ = this.restaurantStore.qrCodeType$;

  shoppingCartAmount$ = this.shoppingCartStore.order$.pipe(
    map(order => order?.orderItems),
    map(orderItems => (orderItems ? orderItems.map(item => item.quantity) : [])),
    map(quantities => quantities.reduce((sum, current) => sum + current, 0))
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

  openProductModal(product: Product, qrCodeType: QrCodeType) {
    const dialogRef = this._bottomSheet.open(ProductToShoppingCartDialogComponent, {
      data: { product: structuredClone(product), quantity: 1, qrCodeType } as ProductCart,
    });

    dialogRef
      .afterDismissed()
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

  openHenry() {
    window.location.href = 'https://www.henryapp.de/';
  }

  showImpressum() {
    window.location.href = 'https://www.henryapp.de/impressum';
  }

  showDatenschutz() {
    window.location.href = 'https://www.henryapp.de/datenschutz';
  }
}
