import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductCart } from 'src/app/shared/models/product-cart';

@Component({
  selector: 'oxp-product-ingridients-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatExpansionModule, MatListModule, TranslateModule],
  templateUrl: './product-ingridients-dialog.component.html',
  styleUrls: ['./product-ingridients-dialog.component.scss'],
})
export class ProductIngridientsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductIngridientsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCart,
    public translateService: TranslateService
  ) {}
}
