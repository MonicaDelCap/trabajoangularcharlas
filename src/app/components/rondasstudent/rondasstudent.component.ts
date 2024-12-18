import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharlascardcomponentComponent } from '../charlascardcomponent/charlascardcomponent.component';
@Component({
  selector: 'app-rondasstudent',
  templateUrl: './rondasstudent.component.html',
  styleUrl: './rondasstudent.component.css'
})
export class RondasstudentComponent implements OnInit{

  roundsArray!:Array<Round>
  inicio!: Date;
  final!:  Date;
  idRonda!: number;
  constructor(
    private _serviceRound: ServiceRound,
    private _router:Router,
    private _active:ActivatedRoute
  ){}


  ngOnInit(): void {
    if(!localStorage.getItem('authToken')){
      this._router.navigate(["/"])
    }
    this._serviceRound.getRounds().then(r => {
      this.roundsArray = r
    })
    this._active.params.subscribe((params: Params) => {
      this.idRonda = params['id']
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
