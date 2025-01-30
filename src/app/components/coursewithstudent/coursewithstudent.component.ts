import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course } from '../../models/course';
import { ServiceTeacherM } from '../../services/service.teacher';
import { StudentsCoursesTeacher } from '../../models/studentscourseteacher';
import { Student } from '../../models/student';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';

@Component({
  selector: 'app-coursewithstudent',
  templateUrl: './coursewithstudent.component.html',
  styleUrl: './coursewithstudent.component.css'
})
export class CoursewithstudentComponent implements OnInit {

  isFlipped = false;
  public courses!: Array<StudentsCoursesTeacher>
  public idCourse!: number;
  public isCourse!: StudentsCoursesTeacher
  public students!: Array<Student>
  public rounds !: Array<Round>
  public enable: string = "enable";

  constructor(
    private _serviceTeacher: ServiceTeacherM,
    private _active: ActivatedRoute,
    private _serviceRound: ServiceRound,
    private _router: Router
  ) {
    this.students = new Array<Student>;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
    this._active.params.subscribe((params: Params) => {
      this.idCourse = params["idCourse"];
      this._serviceTeacher.getCourses().then(r => {
        this.courses = r;

        this.selectCourse();
        this._serviceRound.getRounds().then(r => this.rounds = r)
      })
    })

  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  selectCourse(): boolean {
    for (let course of this.courses) {

      if (course.curso != null && course.curso.idCurso == this.idCourse) {
        this.isCourse = course
        for (let student of course.alumnos) {
          this.students.push(student.alumno)
        }
        return true;
      }
    }
    return false;
  }

  disableCourseStudents(): void {
    this._serviceTeacher.disableCourseWithAllStudents(this.idCourse, false);
    this._serviceTeacher.updateCourse(this.idCourse, false);
    this._router.navigate(["/courses"])
  }
}
