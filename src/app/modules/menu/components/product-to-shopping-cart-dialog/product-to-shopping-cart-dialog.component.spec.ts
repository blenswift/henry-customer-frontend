import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToShoppingCartDialogComponent } from './product-to-shopping-cart-dialog.component';

describe('ProductToShoppingCartDialogComponent', () => {
  let component: ProductToShoppingCartDialogComponent;
  let fixture: ComponentFixture<ProductToShoppingCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductToShoppingCartDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductToShoppingCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
