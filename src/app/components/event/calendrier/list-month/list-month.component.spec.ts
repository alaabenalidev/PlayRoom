import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMonthComponent } from './list-month.component';

describe('ListMonthComponent', () => {
  let component: ListMonthComponent;
  let fixture: ComponentFixture<ListMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
