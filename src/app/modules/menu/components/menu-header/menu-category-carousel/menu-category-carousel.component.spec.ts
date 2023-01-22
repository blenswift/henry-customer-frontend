import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCategoryCarouselComponent } from './menu-category-carousel.component';

describe('MenuCategoryCarouselComponent', () => {
  let component: MenuCategoryCarouselComponent;
  let fixture: ComponentFixture<MenuCategoryCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCategoryCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCategoryCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
