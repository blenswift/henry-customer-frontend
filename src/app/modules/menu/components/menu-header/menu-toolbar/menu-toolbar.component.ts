import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Restaurant } from './../../../models/restaurant';

@Component({
  selector: 'oxp-menu-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, MatBadgeModule],
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuToolbarComponent {
  @Input() itemCount = 0;
  @Input() orderCount = 0;

  @Input() restaurant: Restaurant | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  openOrderXPay() {
    window.location.href = 'https://orderxpay.com/';
  }

  openShoppingCart() {
    this.router.navigate(['/shoppingcart/' + this.route.snapshot.params['qrcode'] + '/' + this.route.snapshot.params['restaurantId']]);
  }
}
