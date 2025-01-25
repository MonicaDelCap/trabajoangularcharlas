import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharlascardcomponentComponent } from '../charlascardcomponent/charlascardcomponent.component';
import { TalksByCourse } from '../../models/talks';
import { ServiceTalks } from '../../services/service.talks';
import { environment } from '../../../environments/environment';
import { Charla } from '../../models/charla';
@Component({
  selector: 'app-rondasstudent',
  templateUrl: './rondasstudent.component.html',
  styleUrl: './rondasstudent.component.css'
})
export class RondasstudentComponent implements OnInit{

  inicio!: Date;
  final!:  Date;
  idRonda!: number;
  talks: Charla[] = []; // Todas las charlas
  
  didUAddTalk!: boolean;
  isButtonDisabled = false;

  constructor(
    private _serviceRound: ServiceRound,
    private _serviceTalks: ServiceTalks,
    private _router:Router,
    private _active:ActivatedRoute
  ){
    this.didUAddTalk = false;
  }


  ngOnInit(): void {
    if(!localStorage.getItem('authToken')){
      this._router.navigate(["/"])
    }
    
    this._active.params.subscribe((params: Params) => {
      this.idRonda = params['id']
      this._serviceTalks.getTalks(this.idRonda).then(r => {
        this.talks = r;
        console.log(this.talks)
        this.didUAddTalk = this.searchTalkInRound();
        console.log(this.didUAddTalk)
      })

    })

  }

  calculateDaysToExpire(dateinit:Date, dateend: Date):number{
    console.log("hola")
    let diferenciaMilisegundos = this.final.getTime()- this.inicio.getTime();

    let diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

    console.log(Math.round(diferenciaDias))
    return Math.round(diferenciaDias);
  }

  searchTalkInRound():boolean{
    for(let talk of this.talks){
      if(talk.idUsuario == environment.idUsuario){
        console.log(talk.idUsuario);
        return true;
      }
    }
    return false;
  }



}
