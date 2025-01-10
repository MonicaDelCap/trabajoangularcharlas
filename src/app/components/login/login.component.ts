import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Login } from '../../models/login';
import { Router } from '@angular/router';
import { ServiceUser } from '../../services/service.user';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  pantallaSeleccionada: string;
  public login: Login; 
  public user:User;
  
  @ViewChild("passwordbox") passswordbox!: ElementRef;
  @ViewChild("emailbox") emailbox!: ElementRef;
 
  @ViewChild("nameBox") nameBox!: ElementRef;
  @ViewChild("surnameBox") surnameBox!: ElementRef;
  @ViewChild("emailBoxRegister") emailBoxRegister!: ElementRef;
  @ViewChild("passwordBoxRegister") passwordBoxRegister!: ElementRef;
  @ViewChild("coursecode") coursecode!: ElementRef;

  constructor(private _router: Router, private _service:ServiceUser){
    this.login  = new Login("", "");
    this.user  = new User(1,"","","",true,"imagen.png", "" , 2);
    this.pantallaSeleccionada = 'signin';
  }

  cambiarPantalla(pantalla: string): void {
    this.pantallaSeleccionada = pantalla;
  }

  ngOnInit(): void {
    localStorage.removeItem('authToken');
  }

  registerUser():void{
    this.user.nombre = this.nameBox.nativeElement.value;
    this.user.apellidos = this.surnameBox.nativeElement.value;
    this.user.email = this.emailBoxRegister.nativeElement.value;
    this.user.password = this.passwordBoxRegister.nativeElement.value;
    let courseCode = this.coursecode.nativeElement.value;

    this._service.register(this.user,courseCode)
    .then( response =>{
      this.cambiarPantalla("signin")
    }).catch( r => {
      console.log("error " +r );
    })
  }
  
  onLogin() {
    this.login.password = this.passswordbox.nativeElement.value;
    this.login.userName = this.emailbox.nativeElement.value;
    this._service.getToken(this.login).then(r => {
      localStorage.setItem('authToken', r.response)
      this._service.getProfile().then(r => {
        let role = r.usuario.idRole;
        if (role == 1) {
          this._router.navigate(["/profile"]);
        } else if (role == 2) {
          this._router.navigate(["/profile"]);
        }
      })
    })
  }
}
