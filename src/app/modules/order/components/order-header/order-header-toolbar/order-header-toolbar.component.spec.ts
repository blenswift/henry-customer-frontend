import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHeaderToolbarComponent } from './order-header-toolbar.component';

describe('OrderHeaderToolbarComponent', () => {
  let component: OrderHeaderToolbarComponent;
  let fixture: ComponentFixture<OrderHeaderToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHeaderToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHeaderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
