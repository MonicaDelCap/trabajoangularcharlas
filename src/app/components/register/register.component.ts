import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceUser } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @ViewChild("namebox") nameBox !: ElementRef;
  @ViewChild("surnamebox") surnameBox !: ElementRef;
  @ViewChild("emailbox") emailBox !: ElementRef;
  @ViewChild("passwordbox") passwordBox !: ElementRef;

  constructor(private _service:ServiceUser,
    private _router:Router
  ){}

  registerUser():void{
    let name = this.nameBox.nativeElement.value;
    let surname = this.surnameBox.nativeElement.value;
    let email = this.emailBox.nativeElement.value;
    let password = this.passwordBox.nativeElement.value;

    this._service.register(name,surname,email,password).subscribe( response =>{
      this._router.navigate(["/"]);
    })
  }
}
