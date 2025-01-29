import { Component, OnInit } from '@angular/core';
import { StudentsInfoTeacher } from '../../models/studentinfoteacher';
import { ServiceTeacherM } from '../../services/service.teacher';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentsInfoDetailsTeacher } from '../../models/studentsinfodetailsteacher';

@Component({
  selector: 'app-detailstudenteacher',
  templateUrl: './detailstudenteacher.component.html',
  styleUrl: './detailstudenteacher.component.css'
})
export class DetailstudenteacherComponent implements OnInit {

  studentInfo !: StudentsInfoDetailsTeacher;
  idStudent !: number;
  state !: string;
  constructor(
    private _serviceTeacher: ServiceTeacherM,
    private _active: ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this._active.params.subscribe((params: Params) => {
      this.idStudent = params["id"]
      this.state = params["state"];
      console.log(this.state)
      if(this.state == "disable"){
        this._serviceTeacher.getStudentByIdDisable(this.idStudent).then(r => {
          this.studentInfo = r
        })
      }else{
        this._serviceTeacher.getStudentById(this.idStudent).then(r => {
          this.studentInfo = r
          console.log("activo")
        })
      }
      
    })
  }

  updateStatus():void{
    if(this.studentInfo.usuario.estadoUsuario){
      this._serviceTeacher.updateStatusStudent(this.idStudent,false).then(r => location.reload());
    }else{
      this._serviceTeacher.updateStatusStudent(this.idStudent,true).then(r =>  location.reload());
    }
  }
}
