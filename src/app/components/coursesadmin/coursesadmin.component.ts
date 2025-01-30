import { Component, OnInit } from '@angular/core';
import { StudentsCoursesTeacher } from '../../models/studentscourseteacher';
import { Course } from '../../models/course';
import { environment } from '../../../environments/environment';
import { ServiceTeacherM } from '../../services/service.teacher';
import { ServiceAdmin } from '../../services/service.admin';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-coursesadmin',
  templateUrl: './coursesadmin.component.html',
  styleUrl: './coursesadmin.component.css'
})
export class CoursesadminComponent implements OnInit {

  public courses!:Array<StudentsCoursesTeacher>
  public coursesName!: Array<Course>
  public role : number = environment.idUsuario;
  public cursos!: Array<Curso>;
  constructor(private _serviceAdmin:ServiceAdmin){}

  ngOnInit(): void {
      this.coursesName = new Array<Course>
      this._serviceAdmin.getCursos().subscribe(response => {
        this.cursos = response;
      })
      console.log(environment.idUsuario)
  }

  getCourses():void{
    for(let course of this.courses){
      if(course.curso != null){
        this.coursesName.push(course.curso);
      }
    }
  }

  hasActiveCourses(): boolean {
    return this.coursesName.some(course => course.activo === true);
  } 

}
