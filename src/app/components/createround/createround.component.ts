import { Component, ElementRef, ViewChild } from '@angular/core';
import { Round } from '../../models/round';
import { ServiceRound } from '../../services/service.round';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createround',
  templateUrl: './createround.component.html',
  styleUrl: './createround.component.css'
})
export class CreateroundComponent {

  @ViewChild("fechaPresentacion") fechaPresentacion!:ElementRef;
  @ViewChild("fechaCierre") fechaCierre!:ElementRef;
  @ViewChild("duracion") duracion!:ElementRef;
  @ViewChild("descripcionModulo") descripcionModulo!:ElementRef;
  @ViewChild("fechaLimiteVotacion") fechaLimiteVotacion!:ElementRef;

  public round: Round;

  constructor(
    private _serviceRound:ServiceRound,
    private _router:Router
  ){
    this.round = new Round(0,0,"","",0,"","");
  }

  createRound():void{
    this.round.fechaPresentacion = this.fechaPresentacion.nativeElement.value;
    this.round.fechaCierre = this.fechaCierre.nativeElement.value;
    this.round.duracion = this.duracion.nativeElement.value;
    this.round.descripcionModulo = this.descripcionModulo.nativeElement.value;
    this.round.fechaLimiteVotacion = this.fechaLimiteVotacion.nativeElement.value;
    this._serviceRound.createRoundById(this.round)
    .then(r => this._router.navigate(["/courses"]))
  }



}
