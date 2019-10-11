import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSalesComponent } from './staff-sales.component';

describe('StaffSalesComponent', () => {
  let component: StaffSalesComponent;
  let fixture: ComponentFixture<StaffSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
