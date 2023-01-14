import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'oxp-order-header-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './order-header-toolbar.component.html',
  styleUrls: ['./order-header-toolbar.component.scss'],
})
export class OrderHeaderToolbarComponent {}
