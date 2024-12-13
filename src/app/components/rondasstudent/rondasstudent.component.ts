import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rondasstudent',
  templateUrl: './rondasstudent.component.html',
  styleUrl: './rondasstudent.component.css'
})
export class RondasstudentComponent implements OnInit{

  roundsArray!:Array<Round>
  inicio!: Date;
  final!:  Date;
  constructor(
    private _serviceRound: ServiceRound,
    private _router:Router
  ){}


  ngOnInit(): void {
    if(!localStorage.getItem('authToken')){
      this._router.navigate(["/"])
    }
    this._serviceRound.getRounds().then(r => {
      this.roundsArray = r
    })
  }

  calculateDaysToExpire(dateinit:Date, dateend: Date):number{
    console.log("hola")
    let diferenciaMilisegundos = this.final.getTime()- this.inicio.getTime();

    let diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

    console.log(Math.round(diferenciaDias))
    return Math.round(diferenciaDias);
  }


}
