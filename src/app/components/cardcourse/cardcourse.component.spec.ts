import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcourseComponent } from './cardcourse.component';

describe('CardcourseComponent', () => {
  let component: CardcourseComponent;
  let fixture: ComponentFixture<CardcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardcourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
