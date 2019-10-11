import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBankDepositsFromCsvComponent } from './upload-bank-deposits-from-csv.component';

describe('UploadBankDepositsFromCsvComponent', () => {
  let component: UploadBankDepositsFromCsvComponent;
  let fixture: ComponentFixture<UploadBankDepositsFromCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBankDepositsFromCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBankDepositsFromCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
