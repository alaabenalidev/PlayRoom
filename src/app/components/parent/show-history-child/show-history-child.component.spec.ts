import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHistoryChildComponent } from './show-history-child.component';

describe('ShowHistoryChildComponent', () => {
  let component: ShowHistoryChildComponent;
  let fixture: ComponentFixture<ShowHistoryChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHistoryChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHistoryChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
