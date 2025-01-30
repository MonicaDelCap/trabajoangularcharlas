import { Component, OnInit } from '@angular/core';
import { ServiceTeacherM } from '../../services/service.teacher';
import { StudentsCoursesTeacher } from '../../models/studentscourseteacher';
import { Course } from '../../models/course';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  public courses!:Array<StudentsCoursesTeacher>
  public coursesName!: Array<Course>
  public role : number = environment.idUsuario;
  constructor(private _serviceTeacher:ServiceTeacherM){}

  ngOnInit(): void {
      this.coursesName = new Array<Course>
      this._serviceTeacher.getCourses().then(r => {
      this.courses=r;
      this.getCourses();
      console.log(this.role)
    });
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
