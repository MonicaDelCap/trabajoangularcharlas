import { Component, OnInit } from '@angular/core';
import { ServiceUser } from '../../services/user.service';
import { User } from '../../models/user';
import { Charla } from '../../models/charla';
import { ServiceTalks } from '../../services/service.talks';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  public user !:User;
  public charlas :Array<Charla> = [];

  constructor(private _service:ServiceUser,
    private _serviceTalks:ServiceTalks
  ){}

  ngOnInit(): void {
    this.loadUser()
    this.loadCharlas();
  }

  loadUser():void{
    this._service.getProfile().then(response => {
      console.log(response)
      this.user = response.usuario;
    })
  }

  loadCharlas():void{
    this._serviceTalks.getCharlaAlumno().subscribe(response =>{
    console.log( response.data)
    this.charlas = response.data.map((item: any) => {
      const charla = item.charla;
      return new Charla(
        charla.descripcion,
        charla.estadoCharla,
        new Date(charla.fechaPropuesta),
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
    });
    console.log("Charlas mapeadas:", this.charlas);
  })
  }

}
