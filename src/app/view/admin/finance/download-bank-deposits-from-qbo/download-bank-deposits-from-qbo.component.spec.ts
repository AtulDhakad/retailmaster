import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadBankDepositsFromQboComponent } from './download-bank-deposits-from-qbo.component';

describe('DownloadBankDepositsFromQboComponent', () => {
  let component: DownloadBankDepositsFromQboComponent;
  let fixture: ComponentFixture<DownloadBankDepositsFromQboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadBankDepositsFromQboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadBankDepositsFromQboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
