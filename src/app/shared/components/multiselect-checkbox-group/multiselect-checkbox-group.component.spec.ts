import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectCheckboxGroupComponent } from './multiselect-checkbox-group.component';

describe('MultiselectCheckboxGroupComponent', () => {
  let component: MultiselectCheckboxGroupComponent;
  let fixture: ComponentFixture<MultiselectCheckboxGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectCheckboxGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiselectCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
