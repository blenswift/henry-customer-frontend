import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultifieldCheckboxGroupComponent } from './multifield-checkbox-group.component';

describe('MultifieldCheckboxGroupComponent', () => {
  let component: MultifieldCheckboxGroupComponent;
  let fixture: ComponentFixture<MultifieldCheckboxGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MultifieldCheckboxGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultifieldCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
