import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'oxp-cart-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss'],
})
export class CartHeaderComponent {}
