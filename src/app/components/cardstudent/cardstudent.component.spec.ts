import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardstudentComponent } from './cardstudent.component';

describe('CardstudentComponent', () => {
  let component: CardstudentComponent;
  let fixture: ComponentFixture<CardstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
