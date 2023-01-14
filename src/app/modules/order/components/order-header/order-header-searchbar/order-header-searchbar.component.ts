import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'oxp-order-header-searchbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './order-header-searchbar.component.html',
  styleUrls: ['./order-header-searchbar.component.scss'],
})
export class OrderHeaderSearchbarComponent {}
