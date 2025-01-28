import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharlascardcomponentComponent } from '../charlascardcomponent/charlascardcomponent.component';
import { TalksByCourse } from '../../models/talks';
import { ServiceTalks } from '../../services/service.talks';
import { environment } from '../../../environments/environment';
import { Charla } from '../../models/charla';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rondasstudent',
  templateUrl: './rondasstudent.component.html',
  styleUrl: './rondasstudent.component.css'
})
export class RondasstudentComponent implements OnInit {

  diferenciaDiasVotacion !: number;
  diferenciaDiasAniadirCharla !: number;
  fechaLimiteAniadirCharla !: string;
  idRonda!: number;
  round !: Round;
  talks: Charla[] = []; // Todas las charlas

  didUAddTalk!: boolean;
  isButtonDisabled = false;

  constructor(
    private _serviceRound: ServiceRound,
    private _serviceTalks: ServiceTalks,
    private _router: Router,
    private _active: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.didUAddTalk = false;
  }


  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }

    this._active.params.subscribe((params: Params) => {
      this.idRonda = params['id']
      this._serviceTalks.getTalks(this.idRonda).then(r => {
        this.talks = r;
        this.didUAddTalk = this.searchTalkInRound();
        this._serviceRound.getRoundById(this.idRonda).then(r => {
          this.round = r;
          this.diferenciaDiasVotacion = this.calculateDaysToExpire(new Date(this.round.fechaLimiteVotacion), new Date())
          this.diferenciaDiasAniadirCharla = this.calculateDaysToExpire(new Date(this.round.fechaCierre), new Date())
          if(this.diferenciaDiasAniadirCharla <= 0 || this.didUAddTalk || this.diferenciaDiasVotacion <= 0){
            this.didUAddTalk = true;
          }else{
            this.didUAddTalk = false;
          }
          
          this.fechaLimiteAniadirCharla ="Fecha limite para añadir charla: " + this.convertDate(this.round.fechaCierre)
          
        })
      })
    })

  }

  calculateDaysToExpire(dateinit: Date, dateend: Date): number {
    let diferenciaMilisegundos =  dateinit.getTime() - dateend.getTime();

    let diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

    console.log(dateinit)
    console.log(dateend)
    console.log(Math.round(diferenciaDias))
    return Math.round(diferenciaDias);
  }

  searchTalkInRound(): boolean {
    for (let talk of this.talks) {
      if (talk.idUsuario == environment.idUsuario) {
        console.log(talk.idUsuario);
        return true;
      }
    }
    return false;
  }

  convertDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }



}
