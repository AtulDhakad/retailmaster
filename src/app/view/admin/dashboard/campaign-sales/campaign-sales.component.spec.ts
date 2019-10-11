import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSalesComponent } from './campaign-sales.component';

describe('CampaignSalesComponent', () => {
  let component: CampaignSalesComponent;
  let fixture: ComponentFixture<CampaignSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
