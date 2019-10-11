import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaginputComponent } from './taginput.component';

describe('TaginputComponent', () => {
  let component: TaginputComponent;
  let fixture: ComponentFixture<TaginputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaginputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaginputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
