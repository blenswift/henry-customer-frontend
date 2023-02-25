import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'oxp-cart-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatIconModule, RouterModule, TranslateModule],
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss'],
})
export class CartHeaderComponent {
  private router = inject(Router);

  navigate() {
    this.router.navigate(['/products/' + sessionStorage.getItem('qrcode')]);
  }
}
