import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductCart } from 'src/app/shared/models/product-cart';
import { CounterButtonComponent } from './../../../../shared/components/counter-button/counter-button.component';
import { SumOfProductPipe } from './../../../../shared/pipes/sum-of-product.pipe';

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
    ReactiveFormsModule,
    SumOfProductPipe,
    TranslateModule,
  ],
  templateUrl: './product-to-shopping-cart-dialog.component.html',
  styleUrls: ['./product-to-shopping-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductToShoppingCartDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductToShoppingCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCart,
    public translateService: TranslateService
  ) {}
}
