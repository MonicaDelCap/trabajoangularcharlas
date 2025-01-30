import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceTeacherM } from '../../services/service.teacher';
import { ServiceAdmin } from '../../services/service.admin';

@Component({
  selector: 'app-updatecourseadmin',
  templateUrl: './updatecourseadmin.component.html',
  styleUrl: './updatecourseadmin.component.css'
})
export class UpdatecourseadminComponent implements OnInit {

  idCurso!: number;
  courseNow!: Course;

  @ViewChild("fechaFin") fechaFin!:ElementRef;
  @ViewChild("fechaInicio") fechaInicio!:ElementRef;
  @ViewChild("nombre") nombre!:ElementRef;
  constructor(
    private _active: ActivatedRoute,
    private _serviceTeacher:ServiceTeacherM,
    private _serviceAdmin:ServiceAdmin,
    private _router:Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
    this._active.params.subscribe((params: Params) => {
      this.idCurso = params['id']
      this._serviceAdmin.getCursoById(this.idCurso).then(r => {
        this.courseNow = r;
        this.nombre.nativeElement.value = this.courseNow.nombre
        this.fechaInicio.nativeElement.value = this.courseNow.fechaInicio
        this.fechaFin.nativeElement.value = this.courseNow.fechaFin
      })

    })
  }


  updateCourse():void{
    this.courseNow.nombre = this.nombre.nativeElement.value;
    this.courseNow.fechaInicio = this.fechaInicio.nativeElement.value;
    this.courseNow.fechaFin = this.fechaFin.nativeElement.value;
    console.log(this.courseNow)
    this._serviceTeacher.updateDateCourse(this.courseNow).then(r => {
      this._router.navigate(["/coursesadmin"])
    })
  }


}