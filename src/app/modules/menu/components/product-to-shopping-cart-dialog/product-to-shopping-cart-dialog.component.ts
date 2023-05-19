import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MultiselectCheckboxGroupComponent } from 'src/app/shared/components/multiselect-checkbox-group/multiselect-checkbox-group.component';
import { ProductCart } from 'src/app/shared/models/product-cart';
import { CheckablePipe } from '../../pipes/checkable.pipe';
import { CounterButtonComponent } from './../../../../shared/components/counter-button/counter-button.component';
import { SumOfProductPipe } from './../../../../shared/pipes/sum-of-product.pipe';
import { ProductIngridientsDialogComponent } from './product-ingridients-dialog/product-ingridients-dialog.component';

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
    MultiselectCheckboxGroupComponent,
    CheckablePipe,
  ],
  templateUrl: './product-to-shopping-cart-dialog.component.html',
  styleUrls: ['./product-to-shopping-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductToShoppingCartDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductToShoppingCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCart,
    public translateService: TranslateService,
    private dialog: MatDialog
  ) {
    // Zuweisung von Defaultwerten; Könnte man über das Datenmodel mal sprechen. Nicht so dolle in diesem Fall
    data.product.extraGroups.map(extraGroup => {
      if (extraGroup.selectionType === 'CHECKBOX') {
        extraGroup.extras
          .filter(extra => extra.id === extraGroup.defaultValue)
          .map(item => {
            item.selected = true;
            return item;
          });
      } else if (extraGroup.selectionType === 'RADIO_GROUP') {
        extraGroup.selected = extraGroup.defaultValue;
      }
      return extraGroup;
    });
  }

  openInfo() {
    const dialogRef = this.dialog.open(ProductIngridientsDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: structuredClone(this.data),
    });

    dialogRef.afterClosed().subscribe();
  }
}
