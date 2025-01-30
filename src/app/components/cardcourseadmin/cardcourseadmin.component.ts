import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { ServiceTeacherM } from '../../services/service.teacher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardcourseadmin',
  templateUrl: './cardcourseadmin.component.html',
  styleUrl: './cardcourseadmin.component.css'
})
export class CardcourseadminComponent implements OnInit {
  @Input() course!: Course;
  isActive!: string;

  constructor(
    private _serviceTeacher:ServiceTeacherM,
    private _router:Router
  ){}

  ngOnInit(): void {
    this.course.nombre = this.course.nombre.toUpperCase();
    this.isActive = this.course.activo ? "Activo" : "Inactivo";
    console.log("cardadministrador")
  }

 
}
