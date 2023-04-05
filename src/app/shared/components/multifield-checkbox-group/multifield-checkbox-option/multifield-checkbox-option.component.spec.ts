import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultifieldCheckboxOptionComponent } from './multifield-checkbox-option.component';

describe('MultifieldCheckboxOptionComponent', () => {
  let component: MultifieldCheckboxOptionComponent;
  let fixture: ComponentFixture<MultifieldCheckboxOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MultifieldCheckboxOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultifieldCheckboxOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
