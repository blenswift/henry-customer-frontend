import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { GooglepayButtonComponent } from './components/googlepay-button/googlepay-button.component';
import SumupWidgetComponent from './components/sumup-widget/sumup-widget.component';

@Component({
    selector: 'oxp-checkout',
    standalone: true,
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    imports: [CommonModule, PageHeaderComponent, TranslateModule, GooglepayButtonComponent, SumupWidgetComponent]
})
export default class CheckoutComponent {
  router = inject(Router);

  navigateToCart() {
    this.router.navigate(['/shoppingcart']);
  }
}
