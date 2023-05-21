import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { combineLatest, of, switchMap } from 'rxjs';
import { SumOfProductsPipe } from 'src/app/shared/pipes/sum-of-products.pipe';
import { ShoppingCartStore } from 'src/app/shared/services/shopping-cart.store';
import { PageHeaderComponent } from './../../shared/components/page-header/page-header.component';
import { RestaurantStore } from './../menu/services/restaurant.store';
import { CartMainComponent } from './components/cart-main/cart-main.component';

@Component({
  selector: 'oxp-shopping-cart-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    CartMainComponent,
    SumOfProductsPipe,
    RouterModule,
    TranslateModule,
    MatSnackBarModule,
    PageHeaderComponent,
  ],
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RestaurantStore],
})
export default class ShoppingCartDialogComponent {
  private shoppingCartStore = inject(ShoppingCartStore);
  private restaurantStore = inject(RestaurantStore);
  private fb = inject(FormBuilder);
  router = inject(Router);
  translateService = inject(TranslateService);

  public shoppingCartVm$ = this.shoppingCartStore.vm$;
  public restaurantInfoVm$ = this.restaurantStore.info$;

  public form$ = combineLatest([this.shoppingCartVm$, this.restaurantStore.info$]).pipe(
    switchMap(([vm, restaurantInfo]) => {
      const itemsArray = vm.items.map(item => this.fb.group({ quantity: item.quantity, product: item.product }));
      const paymentType = restaurantInfo?.acceptedPaymentMethods.includes('DIGITAL')
        ? 'DIGITAL'
        : restaurantInfo?.acceptedPaymentMethods[0];
      return of(
        this.fb.group({
          items: new FormArray(itemsArray),
          paymentType: new FormControl(paymentType),
          fcmToken: new FormControl(vm.fcmToken),
          tip: new FormControl(vm.tip),
          comment: new FormControl(vm.comment),
        })
      );
    })
  );

  constructor() {
    this.shoppingCartStore.loadCache(sessionStorage.getItem('qrcode')!);
    this.restaurantStore.load(sessionStorage.getItem('qrcode')!);
  }

  //ShoppingCartState
  bezahlen(cart: any) {
    this.shoppingCartStore.createOrder(cart);
  }

  removeProduct(itemIndex: number) {
    this.shoppingCartStore.removeItem(itemIndex);
  }

  navigateToProducts() {
    this.router.navigate(['/products/' + sessionStorage.getItem('qrcode')]);
  }
}
