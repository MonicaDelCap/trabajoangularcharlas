import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  public mensaje!: string;
  public inputs!: Array<any> ;
  @ViewChild("passwordbox") passswordbox!: ElementRef;
  @ViewChild("emailbox") emailbox!: ElementRef;

  @ViewChild("nameBox") nameBox!: ElementRef;
  @ViewChild("surnameBox") surnameBox!: ElementRef;
  @ViewChild("emailBoxRegister") emailBoxRegister!: ElementRef;
  @ViewChild("passwordBoxRegister") passwordBoxRegister!: ElementRef;
  @ViewChild("passwordBoxRegisterRepeat") passwordBoxRegisterRepeat!: ElementRef;
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

  

  onLogin():void {
    this.login.password = this.passswordbox.nativeElement.value;
    this.login.userName = this.emailbox.nativeElement.value;
    this._service.getToken(this.login)
    .then(r => {
      localStorage.setItem('authToken', r.response)
      this._service.getProfile().then(r => {
        let role = r.usuario.idRole;
        if (role == 1) {
          this._router.navigate(["/teacherProfile"]);
        } else if (role == 2) {
          this._router.navigate(["/profile"]);
        }
      })
    })
    .catch(r => {
      this.mensaje = "Credenciales incorrectas"
    })
  }

  registerUser():void{
    
    if(this.checkPassword()){
      this.user.nombre = this.nameBox.nativeElement.value;
      
      if(this.checkName(this.user.nombre)){    
        this.user.apellidos = this.surnameBox.nativeElement.value;
        
        if(this.checkSurname(this.user.apellidos)){ 
          this.user.email = this.emailBoxRegister.nativeElement.value;
          this.user.password = this.passwordBoxRegister.nativeElement.value;
          let courseCode = this.coursecode.nativeElement.value;
      
          this._service.register(this.user,courseCode)
          .then( response =>{
            this.cambiarPantalla("signin")
          }).catch( e => {
            if(e == "ERR_BAD_RESPONSE"){
              this.changeInputEmailColorRegister();
            }else if(e == "ERR_BAD_REQUEST"){
              this.changeInputCodeColorRegister();
            } 
          })
        }else{
          this.changeInputSurnameColorRegister();
        }

      }else{
        this.changeInputNameColorRegister();
      }

    }else{
      this.changeInputPasswordColorRegister();
    }
  }

  checkPassword():boolean{
    if(this.passwordBoxRegister.nativeElement.value == this.passwordBoxRegisterRepeat.nativeElement.value){
      return true;
    }else{
      return false;
    }
  }

  checkName(name:string):boolean{
    
    let regex = /^[a-zA-Z]+$/; 
    if(regex.test(name)){
      return true ;
    }else{
      return false;
    }
  }

  checkSurname(surname:string):boolean{
    
    let regex = /^[a-zA-Z]+$/; 
    if(regex.test(surname)){
      return true ;
    }else{
      return false;
    }
  }


  changeInputNameColorRegister():void{
    this.changeAllInputColorRegisterInit();
    let nameInput = this.nameBox.nativeElement;
    nameInput.style.border = '2px solid red'; // Cambia el borde
    nameInput.style.color = 'black'; // Cambia el texto
  }

  changeInputSurnameColorRegister():void{
    this.changeAllInputColorRegisterInit();
    let surnameBox = this.surnameBox.nativeElement;
    surnameBox.style.border = '2px solid red'; // Cambia el borde
    surnameBox.style.color = 'black'; // Cambia el texto
  }

  changeInputPasswordColorRegister():void{
    this.changeAllInputColorRegisterInit();
    let passwordInput = this.passwordBoxRegister.nativeElement;
    passwordInput.style.border = '2px solid red'; // Cambia el borde
    passwordInput.style.color = 'black'; // Cambia el texto
    
    let passwordInputRepeat = this.passwordBoxRegisterRepeat.nativeElement;
    passwordInputRepeat.style.border = '2px solid red'; // Cambia el borde
    passwordInputRepeat.style.color = 'black'; // Cambia el texto
  }

  changeInputEmailColorRegister():void{
    this.changeAllInputColorRegisterInit();
    let email = this.emailBoxRegister.nativeElement;
    email.style.border = '2px solid red'; // Cambia el borde
    email.style.color = 'black'; // Cambia el texto
  }

  changeInputCodeColorRegister():void{
    this.changeAllInputColorRegisterInit();
    let code = this.coursecode.nativeElement;
    code.style.border = '2px solid red'; // Cambia el borde
    code.style.color = 'black'; // Cambia el texto
  }

  changeAllInputColorRegisterInit():void{
    let code = this.coursecode.nativeElement;
    code.style.border = '2px solid white'; // Cambia el borde
    code.style.color = 'black';
    let name = this.nameBox.nativeElement;
    name.style.border = '2px solid white'; // Cambia el borde
    name.style.color = 'black'; 
    let surname = this.surnameBox.nativeElement;
    surname.style.border = '2px solid white'; // Cambia el borde
    surname.style.color = 'black'; 
    let email = this.emailBoxRegister.nativeElement;
    email.style.border = '2px solid white'; // Cambia el borde
    email.style.color = 'black'; 
    let password = this.passwordBoxRegister.nativeElement;
    password.style.border = '2px solid white'; // Cambia el borde
    password.style.color = 'black'; 
    let passwordRepeat = this.passwordBoxRegisterRepeat.nativeElement;
    passwordRepeat.style.border = '2px solid white'; // Cambia el borde
    passwordRepeat.style.color = 'black'; 
    // Cambia el texto
  }

  erroresRegister(e:string):void{
    console.log(e)
    if(e == "ERR_BAD_RESPONSE"){
      this.changeInputEmailColorRegister();
    }else if(e == "ERR_BAD_REQUEST"){
      this.changeInputCodeColorRegister();
    } 
  }

}
