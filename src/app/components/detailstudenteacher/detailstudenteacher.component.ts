import { Component, OnInit } from '@angular/core';
import { StudentsInfoTeacher } from '../../models/studentinfoteacher';
import { ServiceTeacher } from '../../services/service.teacher';
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
  constructor(
    private _serviceTeacher: ServiceTeacher,
    private _active: ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this._active.params.subscribe((params: Params) => {
      this.idStudent = params["id"]
      this._serviceTeacher.getStudentById(this.idStudent).then(r => {
        this.studentInfo = r
      })
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
