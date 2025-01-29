import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseswithstudentdisableComponent } from './courseswithstudentdisable.component';

describe('CourseswithstudentdisableComponent', () => {
  let component: CourseswithstudentdisableComponent;
  let fixture: ComponentFixture<CourseswithstudentdisableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseswithstudentdisableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseswithstudentdisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
