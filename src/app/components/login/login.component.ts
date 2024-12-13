import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUser } from '../../services/user.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  public login:Login = new Login("","");
  @ViewChild("passwordbox") passswordbox!:ElementRef;
  @ViewChild("emailbox") emailbox!:ElementRef;
 
  constructor(private _router: Router, private _service:ServiceUser){}
 
  ngOnInit(): void {
    localStorage.removeItem('authToken');
  }
  onRegister() {
    this._router.navigate(["/register"])
  }

  onLogin() {
    this.login.password = this.passswordbox.nativeElement.value;
    this.login.userName = this.emailbox.nativeElement.value;
    this._service.getToken(this.login).then(r => {
      localStorage.setItem('authToken',r.response)
      this._service.getProfile().then(r => {
        let role = r.usuario.idRole;
        if(role == 1){
          this._router.navigate(["/studentround"]);
        }else if(role == 2){
          this._router.navigate(["/studentround"]);
        }
      })
    })
  }

}
