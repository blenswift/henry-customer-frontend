import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTimeslotsTakeawayComponent } from './cart-timeslots-takeaway.component';

describe('CartTimeslotsTakeawayComponent', () => {
  let component: CartTimeslotsTakeawayComponent;
  let fixture: ComponentFixture<CartTimeslotsTakeawayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CartTimeslotsTakeawayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartTimeslotsTakeawayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
