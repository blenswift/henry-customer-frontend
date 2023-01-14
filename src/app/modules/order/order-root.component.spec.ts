import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRootComponent } from './order-root.component';

describe('OrderRootComponent', () => {
  let component: OrderRootComponent;
  let fixture: ComponentFixture<OrderRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderRootComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
