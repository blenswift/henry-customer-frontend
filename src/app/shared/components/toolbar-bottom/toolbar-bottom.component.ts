import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Order } from 'src/app/modules/orders/models/order';

@Component({
  selector: 'oxp-toolbar-bottom',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslateModule, MatToolbarModule, MatIconModule],
  templateUrl: './toolbar-bottom.component.html',
  styleUrls: ['./toolbar-bottom.component.scss'],
})
export class ToolbarBottomComponent {
  @Input() order!: Order;
  @Input() active = '';

  translateService = inject(TranslateService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  openMenu() {
    this.router.navigate(['/menu/' + sessionStorage.getItem('qrcode') + '/' + sessionStorage.getItem('restaurantId')]);
  }

  openShoppingCart() {
    this.router.navigate(['/shoppingcart/' + sessionStorage.getItem('qrcode') + '/' + sessionStorage.getItem('restaurantId')]);
  }

  openOrders() {
    this.router.navigate(['/orders']);
  }
}
