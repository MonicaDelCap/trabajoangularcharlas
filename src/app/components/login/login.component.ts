import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignDivVisiable: boolean  = true;

  // signUpObj: SignUpModel  = new SignUpModel();
  // loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router){}


  onRegister() {
   
  }

  onLogin() {
    
  }

}
