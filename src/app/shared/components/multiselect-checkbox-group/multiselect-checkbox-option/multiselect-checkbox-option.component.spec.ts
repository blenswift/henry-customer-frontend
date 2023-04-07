import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectCheckboxOptionComponent } from './multiselect-checkbox-option.component';

describe('MultiselectCheckboxOptionComponent', () => {
  let component: MultiselectCheckboxOptionComponent;
  let fixture: ComponentFixture<MultiselectCheckboxOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MultiselectCheckboxOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiselectCheckboxOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
