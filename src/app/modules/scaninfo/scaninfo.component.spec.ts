import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaninfoComponent } from './scaninfo.component';

describe('ScaninfoComponent', () => {
  let component: ScaninfoComponent;
  let fixture: ComponentFixture<ScaninfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ScaninfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScaninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
