import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketdialogComponent } from './marketdialog.component';

describe('MarketdialogComponent', () => {
  let component: MarketdialogComponent;
  let fixture: ComponentFixture<MarketdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
