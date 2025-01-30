import { Component, OnInit } from '@angular/core';
import { StudentsInfoDetailsTeacher } from '../../models/studentsinfodetailsteacher';
import { Charla } from '../../models/charla';
import { ServiceTeacherM } from '../../services/service.teacher';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserInfoAdmin } from '../../models/userinfoadmin';
import { ServiceAdmin } from '../../services/service.admin';

@Component({
  selector: 'app-detailsstudentadmin',
  templateUrl: './detailsstudentadmin.component.html',
  styleUrl: './detailsstudentadmin.component.css'
})
export class DetailsstudentadminComponent implements OnInit {

  studentInfo !: UserInfoAdmin;
  idStudent !: number;
  state !: string;
  charlascast: Array<Charla>
  idCourse !: number;
  constructor(
    private _serviceAdmin: ServiceAdmin,
    private _serviceTeacher: ServiceTeacherM,

    private _active: ActivatedRoute,
    private _router: Router
  ) {
    this.charlascast = new Array<Charla>;
    this.state = "disable"
  }

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
    this._active.params.subscribe((params: Params) => {
      this.idStudent = params["id"]
      this.idCourse = params["course"]
      this._serviceAdmin.getUsuarioById(this.idStudent).then(r => {
        this.studentInfo = r
        this.getCharlas();
      })
    })
  }

  
  getCharlas(): void {

    for (let charla of this.studentInfo.charlas) {
      const charlacast = new Charla(
        charla.descripcion,
        "",
        new Date(charla.fechaPropuesta), // Convertimos a Date
        charla.idCharla,
        this.idCourse,
        charla.idEstadoCharla,
        charla.idRonda,
        charla.idUsuario,
        charla.imagenCharla,
        "",
        charla.tiempo,
        charla.titulo,
        ""
      );

      this.charlascast.push(charlacast)
    }
  }
 
  updateStatus(): void {
    if (this.studentInfo.usuario.estadoUsuario) {
      this._serviceTeacher.updateStatusStudent(this.idStudent, false).then(r => location.reload());
    } else {
      this._serviceTeacher.updateStatusStudent(this.idStudent, true).then(r => location.reload());
    }
  }
}