import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalMenuSideComponent } from './portal-menu-side.component';

describe('PortalMenuSideComponent', () => {
  let component: PortalMenuSideComponent;
  let fixture: ComponentFixture<PortalMenuSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalMenuSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalMenuSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
