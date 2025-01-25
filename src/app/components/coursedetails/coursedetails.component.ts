import { Component } from '@angular/core';
import { StudentsCoursesTeacher } from '../../models/studentscourseteacher';
import { Course } from '../../models/course';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceTeacher } from '../../services/service.teacher';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.css'
})
export class CoursedetailsComponent {
  idCurso!: number;
  courses !: Array<StudentsCoursesTeacher>;
  courseNow!: Course;

  constructor(
    private _active: ActivatedRoute,
    private _serviceTeacher: ServiceTeacher,
    private _router:Router,
    private datepipe: DatePipe
  ) { }


  ngOnInit(): void {
    this._active.params.subscribe((params: Params) => {
      this.idCurso = params['id']
      this._serviceTeacher.getCourses().then(r => {
        this.courses = r;
        this.getCourses();
        this.courseNow.fechaFin = this.convertDate(this.courseNow.fechaFin);
        this.courseNow.fechaInicio = this.convertDate(this.courseNow.fechaInicio);
      })
    })
  }

  getCourses(): void {
    for (let course of this.courses) {
      if (course.curso.idCurso == this.idCurso) {
        this.courseNow = course.curso
      }
    }
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

  deleteCourse(): void {

    Swal.fire({
      title: "Vas a eliminar el curso ¿Estas seguro?",
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
            .then(r => console.log(r));
        }, 2000);
      }
    });

  }
}
