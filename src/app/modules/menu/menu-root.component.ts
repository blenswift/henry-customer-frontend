import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatest, filter, fromEvent, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { ProductCart } from './../../shared/models/product-cart';
import { ShoppingCartState, ShoppingCartStore } from './../../shared/services/shopping-cart.store';
import { OrderStore } from './../orders/services/order.store';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ProductToShoppingCartDialogComponent } from './components/product-to-shopping-cart-dialog/product-to-shopping-cart-dialog.component';
import { RestaurantStore } from './services/restaurant.store';

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
  ],
  templateUrl: './menu-root.component.html',
  styleUrls: ['./menu-root.component.scss'],
  providers: [RestaurantStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuRootComponent implements AfterViewInit {
  private restaurantStore = inject(RestaurantStore);
  private shoppingCartStore = inject(ShoppingCartStore);
  private orderStore = inject(OrderStore);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);

  filterCtrl = new FormControl('', { nonNullable: true });

  private products$ = this.route.params.pipe(
    tap(params => sessionStorage.setItem('qrcode', params['qrcode']!)),
    tap(params => this.restaurantStore.load(params['qrcode']!)),
    tap(params => this.orderStore.loadCache(params['qrcode']!)),
    tap(params => this.shoppingCartStore.loadCache(params['qrcode']!)),
    switchMap(() => this.restaurantStore.products$)
  );

  categories$ = this.restaurantStore.categories$.pipe(
    map(categories => {
      if (categories?.length > 0) categories[0].selected = true;
      return categories;
    })
  );
  restaurant$ = this.restaurantStore.info$;
  status$ = this.restaurantStore.status$;
  orders$ = this.orderStore.orders$;
  shoppingCart$: Observable<ShoppingCartState> = this.shoppingCartStore.vm$;
  filteredProductList$ = combineLatest([this.products$, this.filterCtrl.valueChanges.pipe(startWith(''))]).pipe(
    map(([products, filterParam]) =>
      products.filter(product => !filterParam.length || product.name?.toLowerCase().includes(filterParam.toLowerCase()))
    )
  );

  scrolling$!: Observable<boolean>;

  ngAfterViewInit(): void {
    this.scrolling$ = fromEvent(document.getElementById('track-scrolling')!, 'scroll').pipe(
      switchMap(() => (document.getElementById('track-scrolling')!.scrollTop > 0 ? of(true) : of(false)))
    );
  }

  openProductModal(product: Product) {
    const dialogRef = this.dialog.open(ProductToShoppingCartDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { product, quantity: 1 } as ProductCart,
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

  callService() {
    const qrcode = sessionStorage.getItem('qrcode');
    this.restaurantStore.callService(qrcode!);
  }
}
