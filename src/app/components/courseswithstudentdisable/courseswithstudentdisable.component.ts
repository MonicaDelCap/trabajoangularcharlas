import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceTeacherM } from '../../services/service.teacher';
import { ServiceRound } from '../../services/service.round';
import { StudentsCoursesTeacher } from '../../models/studentscourseteacher';
import { environment } from '../../../environments/environment';
import { ServiceAdmin } from '../../services/service.admin';

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
  public role: number = environment.idUsuario;
    constructor(
      private _serviceTeacher: ServiceTeacherM,
      private _serviceAdmin: ServiceAdmin,
      private _active:ActivatedRoute,
      private _serviceRound:ServiceRound,
      private _router:Router
    ) { 
      this.students = new Array<Student>;
    }
   ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
      this._active.params.subscribe((params: Params) => {
        this.idCourse = params["id"];
        if(this.role == 2){
          this._serviceTeacher.getStudentsCourseDisable().then(r => {
            this.courses = r;
            this.selectCourse();
          })
        }else{
          this._serviceAdmin.getUsuariosCurso(this.idCourse).subscribe(r => this.students = r)
        }
        
      })
    
    }
  
   
    selectCourseWithTeacher():void{
      let estudiantes = this.students;
      this.students = new Array<Student>
      for(let stu of estudiantes){
        if(stu.idRole == 1 ){
          
        }else{
          this.students.push(stu)
        }
      }
    }
  
    selectCourse():boolean{
      for(let course of this.courses){
  
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
