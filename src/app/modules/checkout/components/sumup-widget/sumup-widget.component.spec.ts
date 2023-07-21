import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumupWidgetComponent } from './sumup-widget.component';

describe('SumupWidgetComponent', () => {
  let component: SumupWidgetComponent;
  let fixture: ComponentFixture<SumupWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SumupWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumupWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
