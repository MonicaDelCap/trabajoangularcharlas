import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceTeacherM } from '../../services/service.teacher';
import { ServiceAdmin } from '../../services/service.admin';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coursedetailsadmin',
  templateUrl: './coursedetailsadmin.component.html',
  styleUrl: './coursedetailsadmin.component.css'
})
export class CoursedetailsadminComponent implements OnInit {

  idCurso!: number;
  courseNow!: Course;
  fechaini!: string;
  fechafin!: string;

  @ViewChild("fechaFin") fechaFin!:ElementRef;
  @ViewChild("fechaInicio") fechaInicio!:ElementRef;
  @ViewChild("nombre") nombre!:ElementRef;
  constructor(
    private _active: ActivatedRoute,
    private _serviceTeacher:ServiceTeacherM,
    private _serviceAdmin:ServiceAdmin,
    private _router:Router,
    private datepipe:DatePipe
  ) { }

  ngOnInit(): void {
    this._active.params.subscribe((params: Params) => {
      this.idCurso = params['id']
      this._serviceAdmin.getCursoById(this.idCurso).then(r => {
        this.courseNow = r;
        this.fechaini = this.convertDate(this.courseNow.fechaInicio)
        this.fechafin = this.convertDate(this.courseNow.fechaFin)
        this.nombre.nativeElement.value = this.courseNow.nombre
        this.fechaInicio.nativeElement.value = this.convertDate(this.courseNow.fechaInicio)
        this.fechaFin.nativeElement.value = this.convertDate(this.courseNow.fechaFin)
      })

    })
  }

  
  convertDate(date: string): string {
    return this.datepipe.transform(date, 'dd / MM / yyyy')!;
  }


  desactivatedCourse(): void {
     Swal.fire({
       title: "Vas a desactivar el curso ¿Estas seguro?",
       text: "Esta accion no es revertible",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       cancelButtonText: "Cancelar",
       confirmButtonText: "Si, desactivar"
     }).then((result) => {
       if (result.isConfirmed) {
         Swal.fire({
           title: "¡Desactivado!",
           text: "El curso ha sido desactivado",
           icon: "success"
         });
         setTimeout(() => {
           this._serviceTeacher.updateCourse(this.courseNow.idCurso, false)
             .then(r => this._router.navigate(["/courses"]));
         }, 2000);
       }
     });
 
   }


}