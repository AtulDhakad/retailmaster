import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSalesComponent } from './store-sales.component';

describe('StoreSalesComponent', () => {
  let component: StoreSalesComponent;
  let fixture: ComponentFixture<StoreSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
