import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesadminComponent } from './coursesadmin.component';

describe('CoursesadminComponent', () => {
  let component: CoursesadminComponent;
  let fixture: ComponentFixture<CoursesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
