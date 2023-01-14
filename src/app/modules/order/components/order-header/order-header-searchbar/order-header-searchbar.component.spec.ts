import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHeaderSearchbarComponent } from './order-header-searchbar.component';

describe('OrderHeaderSearchbarComponent', () => {
  let component: OrderHeaderSearchbarComponent;
  let fixture: ComponentFixture<OrderHeaderSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHeaderSearchbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHeaderSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
