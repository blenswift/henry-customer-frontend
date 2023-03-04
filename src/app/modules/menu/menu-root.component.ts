import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { combineLatest, filter, fromEvent, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ProductCart } from './../../shared/models/product-cart';
import { OrderService } from './../orders/services/order.service';
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
    MenuHeaderComponent,
    MatDialogModule,
    MenuListComponent,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './menu-root.component.html',
  styleUrls: ['./menu-root.component.scss'],
})
export class MenuRootComponent implements AfterViewInit {
  filterCtrl = new FormControl('', { nonNullable: true });

  menu$ = this.route.params.pipe(
    tap(params => sessionStorage.setItem('qrcode', params['qrcode']!)),
    switchMap(params => this.menuService.getMenu(params['qrcode']!))
  );
  filteredProductList$ = combineLatest([
    this.menu$.pipe(map(menu => menu.products)),
    this.filterCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([products, filterParam]) =>
      products.filter(product => !filterParam.length || product.name.toLowerCase().includes(filterParam.toLowerCase()))
    )
  );

  orders$ = this.orderService.items$;
  shoppingCart$ = this.shoppingcartService.items$;
  restaurant$ = this.route.params.pipe(switchMap(params => this.restaurantService.getRestaurant(params['qrcode']!)));
  scrolling$!: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    public shoppingcartService: ShoppingCartService,
    private menuService: MenuService,
    private restaurantService: RestaurantService,
    public orderService: OrderService,
    private route: ActivatedRoute
  ) {}

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
        this.shoppingcartService.add(result);
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
    console.log(sessionStorage.getItem('qrcode'));
    this.restaurantService.callService(qrcode!).subscribe();
  }
}
