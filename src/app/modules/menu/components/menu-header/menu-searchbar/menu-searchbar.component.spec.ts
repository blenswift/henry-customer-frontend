import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSearchbarComponent } from './menu-searchbar.component';

describe('MenuSearchbarComponent', () => {
  let component: MenuSearchbarComponent;
  let fixture: ComponentFixture<MenuSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSearchbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
