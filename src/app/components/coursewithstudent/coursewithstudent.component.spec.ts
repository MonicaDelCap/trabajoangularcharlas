import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursewithstudentComponent } from './coursewithstudent.component';

describe('CoursewithstudentComponent', () => {
  let component: CoursewithstudentComponent;
  let fixture: ComponentFixture<CoursewithstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursewithstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursewithstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
