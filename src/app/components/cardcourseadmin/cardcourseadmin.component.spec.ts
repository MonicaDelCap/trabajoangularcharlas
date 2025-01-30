import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcourseadminComponent } from './cardcourseadmin.component';

describe('CardcourseadminComponent', () => {
  let component: CardcourseadminComponent;
  let fixture: ComponentFixture<CardcourseadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardcourseadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardcourseadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
