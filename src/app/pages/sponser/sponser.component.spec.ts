import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponserComponent } from './sponser.component';

describe('SponserComponent', () => {
  let component: SponserComponent;
  let fixture: ComponentFixture<SponserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
