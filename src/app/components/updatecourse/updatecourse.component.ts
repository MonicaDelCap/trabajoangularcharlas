import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceTeacherM } from '../../services/service.teacher';
import { StudentsCoursesTeacher } from '../../models/studentscourseteacher';
import { Course } from '../../models/course';
import { Round } from '../../models/round';

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrl: './updatecourse.component.css'
})
export class UpdatecourseComponent implements OnInit {

  idCurso!: number;
  courses !:Array<StudentsCoursesTeacher>;
  courseNow!: Course;

  @ViewChild("fechaFin") fechaFin!:ElementRef;
  @ViewChild("fechaInicio") fechaInicio!:ElementRef;
  @ViewChild("nombre") nombre!:ElementRef;
  constructor(
    private _active: ActivatedRoute,
    private _serviceTeacher:ServiceTeacherM,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this._active.params.subscribe((params: Params) => {
      this.idCurso = params['id']
      this._serviceTeacher.getCourses().then(r => {
        this.courses = r;
        this.getCourses();
        this.nombre.nativeElement.value = this.courseNow.nombre
        this.fechaInicio.nativeElement.value = this.courseNow.fechaInicio
        this.fechaFin.nativeElement.value = this.courseNow.fechaFin
      })

    })
  }

  getCourses():void{
    for(let course of this.courses){
      if(course.curso.idCurso == this.idCurso){
         this.courseNow = course.curso
         
      }
    }
  }

  updateCourse():void{
    this.courseNow.nombre = this.nombre.nativeElement.value;
    this.courseNow.fechaInicio = this.fechaInicio.nativeElement.value;
    this.courseNow.fechaFin = this.fechaFin.nativeElement.value;
    console.log(this.courseNow)
    this._serviceTeacher.updateDateCourse(this.courseNow).then(r => {
      this._router.navigate(["/courses"])
    })
  }


}
