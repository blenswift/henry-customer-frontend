import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIngridientsDialogComponent } from './product-ingridients-dialog.component';

describe('ProductIngridientsDialogComponent', () => {
  let component: ProductIngridientsDialogComponent;
  let fixture: ComponentFixture<ProductIngridientsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductIngridientsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductIngridientsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
