import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Product } from 'src/app/shared/models/product';
import { CounterButtonComponent } from './../../../../shared/components/counter-button/counter-button.component';

@Component({
  selector: 'oxp-product-to-shopping-cart-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    CounterButtonComponent,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './product-to-shopping-cart-dialog.component.html',
  styleUrls: ['./product-to-shopping-cart-dialog.component.scss'],
})
export class ProductToShoppingCartDialogComponent {
  counter = 1;

  constructor(
    public dialogRef: MatDialogRef<ProductToShoppingCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}
}
