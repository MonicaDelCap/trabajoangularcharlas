import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceTeacherM } from '../../services/service.teacher';
import { Course } from '../../models/course';

@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrl: './createcourse.component.css'
})
export class CreatecourseComponent implements OnInit {

  newCourse !: Course;

  @ViewChild("fechaFin") fechaFin!: ElementRef;
  @ViewChild("fechaInicio") fechaInicio!: ElementRef;
  @ViewChild("nombre") nombre!: ElementRef;
  @ViewChild("id") id!: ElementRef;

  constructor(
    private _active: ActivatedRoute,
    private _serviceTeacher: ServiceTeacherM,
    private _router: Router
  ) {
    this.newCourse = new Course(0, "", "", "", true);
  }

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
  }
  createCourse(): void {
    this.newCourse.idCurso = this.id.nativeElement.value; 
    this.newCourse.nombre = this.nombre.nativeElement.value; 
    this.newCourse.fechaInicio = this.fechaInicio.nativeElement.value; 
    this.newCourse.fechaFin = this.fechaFin.nativeElement.value; 
    this._serviceTeacher.createCourse(this.newCourse).then( r => this._router.navigate(["/courses"]))

  }

}
