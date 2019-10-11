import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMegamenuComponent } from './sidenav-megamenu.component';

describe('SidenavMegamenuComponent', () => {
  let component: SidenavMegamenuComponent;
  let fixture: ComponentFixture<SidenavMegamenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavMegamenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMegamenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
