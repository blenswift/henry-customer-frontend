import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFilterSheetComponent } from './menu-filter-sheet.component';

describe('MenuFilterSheetComponent', () => {
  let component: MenuFilterSheetComponent;
  let fixture: ComponentFixture<MenuFilterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFilterSheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuFilterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
