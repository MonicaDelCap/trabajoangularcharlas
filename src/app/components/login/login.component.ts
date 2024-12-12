import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUser } from '../../services/user.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  public login:Login = new Login("","");
  @ViewChild("passwordbox") passswordbox!:ElementRef;
  @ViewChild("emailbox") emailbox!:ElementRef;
  constructor(private _router: Router, private _service:ServiceUser){}
  onRegister() {
    this._router.navigate(["/register"])
  }


  onLogin() {
    this.login.password = this.passswordbox.nativeElement.value;
    this.login.userName = this.emailbox.nativeElement.value;
    this._service.getToken(this.login).then(r => console.log(r.response))
  }

}
