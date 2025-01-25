import { Component, OnInit } from '@angular/core';
import { ServiceTeacherM } from '../../services/service.teacher';
import { StudentsCoursesTeacher } from '../../models/studentscourseteacher';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  public courses!:Array<StudentsCoursesTeacher>
  public coursesName!: Array<Course>
  constructor(private _serviceTeacher:ServiceTeacherM){}

  ngOnInit(): void {
      this.coursesName = new Array<Course>
      this._serviceTeacher.getCourses().then(r => {
      this.courses=r;
      this.getCourses();
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
