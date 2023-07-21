import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglepayButtonComponent } from './googlepay-button.component';

describe('GooglepayButtonComponent', () => {
  let component: GooglepayButtonComponent;
  let fixture: ComponentFixture<GooglepayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GooglepayButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GooglepayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
