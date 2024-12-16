import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceUser } from '../../services/user.service';
import { User } from '../../models/user';
import { Charla } from '../../models/charla';
import { ServiceCharla } from '../../services/charla.service';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  public user !:User;
  public charlas :Array<Charla> = [];
  public rondas :Array<Round> = [];
  public acceptedCharlas: Array<Charla> = [];
  public isEditing = false;

  constructor(private _service:ServiceUser,
    private _serviceCharla:ServiceCharla,
    private _serviceRonda:ServiceRound,
  ){}

  ngOnInit(): void {
    this.loadUser()
    this.loadCharlas();
    this.loadRondas();
  }

  loadUser():void{
    this._service.getProfile().then(response => {
      //console.log(response)
      this.user = response.usuario;
    })
  }

  loadCharlas():void{
    this._serviceCharla.getCharlaAlumno().subscribe(response =>{
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
  })
  this.checkCharla();
  }

  loadRondas():void{
    this._serviceRonda.getRounds().then((response) =>{
      //console.log(response)
      this.rondas = response
    })
  }

  checkCharla():void{
    for(let i = 0;i < this.charlas.length;i++){
      if(this.charlas[i].idEstadoCharla != 1){
        this.acceptedCharlas.push(this.charlas[i])
      }
    }
  }

  editProfile():void{
    this.isEditing = !this.isEditing;
  }

}
