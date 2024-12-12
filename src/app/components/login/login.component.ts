import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  isSignDivVisiable: boolean  = true;

  constructor(private _router: Router){}


  onRegister() {
   this._router.navigate(["/register"])
  }

  onLogin() {
    
  }

}
