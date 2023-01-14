import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHeaderCategoryCarouselComponent } from './order-header-category-carousel.component';

describe('CategoryCarouselComponent', () => {
  let component: OrderHeaderCategoryCarouselComponent;
  let fixture: ComponentFixture<OrderHeaderCategoryCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHeaderCategoryCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHeaderCategoryCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
