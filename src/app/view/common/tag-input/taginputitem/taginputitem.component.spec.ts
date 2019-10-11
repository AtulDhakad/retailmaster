import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaginputitemComponent } from './taginputitem.component';

describe('TaginputitemComponent', () => {
  let component: TaginputitemComponent;
  let fixture: ComponentFixture<TaginputitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaginputitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaginputitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
