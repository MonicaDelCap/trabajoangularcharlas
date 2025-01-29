import { Component, OnInit } from '@angular/core';
import { StudentsInfoTeacher } from '../../models/studentinfoteacher';
import { ServiceTeacherM } from '../../services/service.teacher';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentsInfoDetailsTeacher } from '../../models/studentsinfodetailsteacher';
import { Charla } from '../../models/charla';

@Component({
  selector: 'app-detailstudenteacher',
  templateUrl: './detailstudenteacher.component.html',
  styleUrl: './detailstudenteacher.component.css'
})
export class DetailstudenteacherComponent implements OnInit {

  studentInfo !: StudentsInfoDetailsTeacher;
  idStudent !: number;
  state !: string;
  charlascast: Array<Charla>
  constructor(
    private _serviceTeacher: ServiceTeacherM,
    private _active: ActivatedRoute,
    private _router: Router
  ) {
    this.charlascast = new Array<Charla>;
  }

  ngOnInit(): void {
    this._active.params.subscribe((params: Params) => {
      this.idStudent = params["id"]
      this.state = params["state"];

      if (this.state == "disable") {
        this._serviceTeacher.getStudentByIdDisable(this.idStudent).then(r => {
          this.studentInfo = r
          this.getCharlas();
        })
      } else {
        this._serviceTeacher.getStudentById(this.idStudent).then(r => {
          this.studentInfo = r
          this.getCharlas();
        })
      }
    })
  }

  getCharlas(): void {

    for (let charla of this.studentInfo.charlas) {
      const charlacast = new Charla(
        charla.descripcion,
        charla.estadoCharla,
        new Date(charla.fechaPropuesta), // Convertimos a Date
        charla.idCharla,
        charla.idCurso,
        charla.idEstadoCharla,
        charla.idRonda,
        charla.idUsuario,
        charla.imagenCharla,
        charla.nombreCurso,
        charla.tiempo,
        charla.titulo,
        charla.usuario
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
