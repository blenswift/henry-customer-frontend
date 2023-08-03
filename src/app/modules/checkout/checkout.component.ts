import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { GooglepayButtonComponent } from './components/googlepay-button/googlepay-button.component';
import SumupWidgetComponent from './components/sumup-widget/sumup-widget.component';
import { CheckoutStore } from './services/checkout.store';

@Component({
  selector: 'oxp-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, PageHeaderComponent, TranslateModule, GooglepayButtonComponent, SumupWidgetComponent, MatProgressSpinnerModule],
  providers: [CheckoutStore],
})
export default class CheckoutComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  checkoutStore = inject(CheckoutStore);

  vm$ = this.checkoutStore.vm$;

  navigateToCart() {
    this.router.navigate(['/shoppingcart/' + sessionStorage.getItem('qrcode') + '/' + sessionStorage.getItem('restaurantId')]);
  }
}
