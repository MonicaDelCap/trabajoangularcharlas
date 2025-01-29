import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { ActivatedRoute, Params } from '@angular/router';
import { ServiceTeacherM } from '../../services/service.teacher';
import { ServiceRound } from '../../services/service.round';
import { StudentsCoursesTeacher } from '../../models/studentscourseteacher';

@Component({
  selector: 'app-courseswithstudentdisable',
  templateUrl: './courseswithstudentdisable.component.html',
  styleUrl: './courseswithstudentdisable.component.css'
})
export class CourseswithstudentdisableComponent implements OnInit {
  public students!: Array<Student>
  public idCourse!:number;
  public courses!:Array<StudentsCoursesTeacher>
  public isCourse!: StudentsCoursesTeacher
  public disable: string = "disable";

    constructor(
      private _serviceTeacher: ServiceTeacherM,
      private _active:ActivatedRoute,
      private _serviceRound:ServiceRound
    ) { 
      this.students = new Array<Student>;
    }
   ngOnInit(): void {
      this._active.params.subscribe((params: Params) => {
        this.idCourse = params["id"];
        
        this._serviceTeacher.getStudentsCourseDisable().then(r => {
          console.log(this.courses)
          this.courses = r;
          this.selectCourse();
        })
      })
    
    }
  
   
  
    selectCourse():boolean{
      for(let course of this.courses){
        console.log(course)
  
        if(course.curso != null && course.curso.idCurso == this.idCourse){
          this.isCourse = course
          for(let student of course.alumnos){
            this.students.push(student.alumno)
          }
          return true;
        }
      }
      return false;
    }
}
