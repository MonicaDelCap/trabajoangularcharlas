import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharlascardcomponentComponent } from '../charlascardcomponent/charlascardcomponent.component';
import { TalksByCourse } from '../../models/talks';
import { ServiceTalks } from '../../services/service.talks';
@Component({
  selector: 'app-rondasstudent',
  templateUrl: './rondasstudent.component.html',
  styleUrl: './rondasstudent.component.css'
})
export class RondasstudentComponent implements OnInit{

  inicio!: Date;
  final!:  Date;
  idRonda!: number;
  talks!: Array<TalksByCourse>;

  constructor(
    private _serviceRound: ServiceRound,
    private _serviceTalks: ServiceTalks,
    private _router:Router,
    private _active:ActivatedRoute
  ){}


  ngOnInit(): void {
    if(!localStorage.getItem('authToken')){
      this._router.navigate(["/"])
    }
    
    this._active.params.subscribe((params: Params) => {
      this.idRonda = params['id']
      this._serviceTalks.getTalks(this.idRonda).then(r => this.talks = r)
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
