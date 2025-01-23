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

 
}
