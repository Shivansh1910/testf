import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecLoginComponent } from './sec-login.component';

describe('SecLoginComponent', () => {
  let component: SecLoginComponent;
  let fixture: ComponentFixture<SecLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
