import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedetailsadminComponent } from './coursedetailsadmin.component';

describe('CoursedetailsadminComponent', () => {
  let component: CoursedetailsadminComponent;
  let fixture: ComponentFixture<CoursedetailsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursedetailsadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursedetailsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
