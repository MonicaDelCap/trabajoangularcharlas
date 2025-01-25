import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRondaComponent } from './teacher-ronda.component';

describe('TeacherRondaComponent', () => {
  let component: TeacherRondaComponent;
  let fixture: ComponentFixture<TeacherRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherRondaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
