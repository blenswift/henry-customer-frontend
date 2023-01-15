import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { filter } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { OrderHeaderComponent } from './components/order-header/order-header.component';
import { OrderProductListComponent } from './components/order-product-list/order-product-list.component';
import { ProductToShoppingCartDialogComponent } from './components/product-to-shopping-cart-dialog/product-to-shopping-cart-dialog.component';

@Component({
  selector: 'oxp-order-root',
  standalone: true,
  imports: [
    CommonModule,
    OrderProductListComponent,
    OrderHeaderComponent,
    MatDialogModule,
    MatRadioModule,
  ],
  templateUrl: './order-root.component.html',
  styleUrls: ['./order-root.component.scss'],
})
export class OrderRootComponent {
  products: Product[] = [
    {
      categoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afff',
      name: 'Pizza Margherita',
      imageUrl:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
      description:
        'Für unseren Pizzateig mit 48 stündiger Teigruhe verwenden wir ausschließlich original italienisches TIPO 00-Mehl. Außerdem kommen nur die besten Mutti San Marzano Tomaten auf unsere Pizzen.',
      basePrice: 800,
      available: true,
      ingredients: ['Tomatensauce', 'Fior di Latte', 'Olivenöl', 'Basilikum'],
      legalAge: 0,
      allergens: ['Weizen', 'Laktose'],
      additives: [],
      extraGroups: [
        {
          name: 'Größe',
          selectionType: 'RADIO_GROUP',
          defaultValue: '62fe250a-8ee2-4273-acfd-b2c311d166f7',
          extras: [
            {
              id: '62fe250a-8ee2-4273-acfd-b2c311d166f7',
              price: 800,
              name: 'Klein - 6"',
              allergens: ['Weizen', 'Laktose'],
              additives: [],
            },
            {
              id: '62fe250a-8ee2-4273-acfd-b2c311d166f8',
              price: 1200,
              name: 'Mittel - 10"',
              allergens: ['Weizen', 'Laktose'],
              additives: [],
            },
            {
              id: '62fe250a-8ee2-4273-acfd-b2c311d166f9',
              price: 1600,
              name: 'Groß - 14"',
              allergens: ['Weizen', 'Laktose'],
              additives: [],
            },
          ],
        },
        {
          name: 'Rand',
          selectionType: 'RADIO_GROUP',
          defaultValue: '62fe250a-8ee2-4273-acfd-b2c311d166f7',
          extras: [
            {
              id: '62fe250a-8ee2-4273-acfd-b2c311d166f7',
              price: null,
              name: 'Klassisch',
              allergens: ['Weizen', 'Laktose'],
              additives: [],
            },
            {
              id: '62fe250a-8ee2-4273-acfd-b2c311d166f8',
              price: null,
              name: 'Extra dünn',
              allergens: ['Weizen', 'Laktose'],
              additives: [],
            },
            {
              id: '62fe250a-8ee2-4273-acfd-b2c311d166f9',
              price: 150,
              name: 'Käserand',
              allergens: ['Weizen', 'Laktose'],
              additives: [],
            },
          ],
        },
        {
          name: 'Extras',
          selectionType: 'CHECKBOX',
          defaultValue: null,
          extras: [
            {
              id: '62fe250a-8ee2-4273-acfd-b2c311d166f7',
              price: 250,
              name: 'Salami',
              allergens: ['Weizen', 'Laktose'],
              additives: [],
            },
            {
              id: '1e226fe6-e57e-48d0-a26d-29b803d7cd57',
              price: 200,
              name: 'Oliven',
              allergens: ['Weizen', 'Laktose'],
              additives: [],
            },
          ],
        },
      ],
    },
  ];

  categories: Category[] = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Pizza',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png',
      selected: true,
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Salat',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/184/184559.png',
      selected: false,
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Pommes',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/706/706850.png',
      selected: false,
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Nachtisch',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3654/3654864.png',
      selected: false,
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Getränke',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2719/2719909.png',
      selected: false,
    },
  ];

  constructor(public dialog: MatDialog) {}

  openProductModal(product: Product) {
    const dialogRef = this.dialog.open(ProductToShoppingCartDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: product,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(x => x))
      .subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
}
