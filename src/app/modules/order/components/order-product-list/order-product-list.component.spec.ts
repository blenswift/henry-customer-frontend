import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderProductListComponent } from './order-product-list.component';

describe('ProductListComponent', () => {
  let component: OrderProductListComponent;
  let fixture: ComponentFixture<OrderProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProductListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
