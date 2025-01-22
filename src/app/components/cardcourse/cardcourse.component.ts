import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { ServiceTeacher } from '../../services/service.teacher';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-cardcourse',
  templateUrl: './cardcourse.component.html',
  styleUrls: ['./cardcourse.component.css']
})
export class CardcourseComponent implements OnInit {
  @Input() course!: Course;
  isActive!: string;

  constructor(
    private _serviceTeacher:ServiceTeacher,
    private _router:Router
  ){}

  ngOnInit(): void {
    this.course.nombre = this.course.nombre.toUpperCase();
    this.isActive = this.course.activo ? "Activo" : "Inactivo";
  }

  desactivatedCourse():void{

    Swal.fire({
      title: "Vas a desactivar el curso    ¿Estas seguro?",
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
          this._serviceTeacher.updateCourse(this.course.idCurso,false)
        .then(r => location.reload());
        }, 2000);
        
        

      }
    });
    
  }
}
