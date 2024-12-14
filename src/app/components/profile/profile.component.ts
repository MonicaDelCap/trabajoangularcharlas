import { Component, OnInit } from '@angular/core';
import { ServiceUser } from '../../services/user.service';
import { User } from '../../models/user';
import { Charla } from '../../models/charla';
import { ServiceCharla } from '../../services/charla.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  public user !:User;
  public charlas !:Array<Charla>;

  constructor(private _service:ServiceUser,
    private _serviceCharla:ServiceCharla
  ){}

  ngOnInit(): void {
    this.loadUser()
    this.loadCharlas();
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
    this.charlas = response.data;
    console.log(this.charlas[0].tiempo)
   })
  }

}
