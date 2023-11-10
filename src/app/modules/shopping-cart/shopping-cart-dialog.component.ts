import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { combineLatest, filter, of, switchMap } from 'rxjs';
import { SumOfProductsPipe } from 'src/app/shared/pipes/sum-of-products.pipe';
import { ShoppingCartStore } from 'src/app/shared/services/shopping-cart.store';
import { PaymentType } from '../orders/models/order';
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './shopping-cart-dialog.component.html',
  styleUrls: ['./shopping-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShoppingCartDialogComponent {
  private shoppingCartStore = inject(ShoppingCartStore);
  private restaurantStore = inject(RestaurantStore);
  private fb = inject(FormBuilder);
  router = inject(Router);
  translateService = inject(TranslateService);
  route = inject(ActivatedRoute);

  public shoppingCartVm$ = this.shoppingCartStore.vm$;
  public restaurantInfoVm$ = this.restaurantStore.info$;
  public ageRestrictedProducts$ = this.restaurantStore.ageRestrictedProducts$;

  public onlyPhisicalPayment = false;

  public form$ = combineLatest([this.shoppingCartVm$, this.restaurantStore.info$]).pipe(
    filter(([vm, restaurantInfo]) => !!vm && !!restaurantInfo),
    switchMap(([vm, restaurantInfo]) => {
      const itemsArray = vm.items.map(item => this.fb.group({ quantity: item.quantity, product: item.product }));
      this.onlyPhisicalPayment =
        restaurantInfo!.acceptedPaymentChannels.includes('PHYSICAL') && restaurantInfo!.acceptedPaymentChannels.length === 1;

      let paymentType = vm.paymentType;

      if (!paymentType) {
        paymentType = restaurantInfo?.acceptedPaymentChannels.includes('DIGITAL') ? 'DIGITAL' : restaurantInfo?.acceptedPaymentChannels[0];
      }

      return of(
        this.fb.group({
          items: new FormArray(itemsArray),
          paymentType: new FormControl(paymentType),
          fcmToken: new FormControl(vm.fcmToken),
          tip: new FormControl(vm.tip, [Validators.min(0)]),
          notes: new FormControl(vm.notes),
        })
      );
    })
  );

  constructor() {
    this.shoppingCartStore.loadCache();
    this.restaurantStore.load();
  }

  //ShoppingCartState
  bezahlen(cart: any) {
    this.shoppingCartStore.createOrder(cart);
  }

  removeProduct(itemIndex: number) {
    this.shoppingCartStore.removeItem(itemIndex);
  }

  paymentTypeChanged(paymentType: PaymentType) {
    this.shoppingCartStore.setPaymentType(paymentType);
  }

  navigateToProducts() {
    this.router.navigate(['/menu/' + this.route.snapshot.params['qrcode'] + '/' + this.route.snapshot.params['restaurantId']]);
  }
}
