import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-updateround',
  templateUrl: './updateround.component.html',
  styleUrl: './updateround.component.css'
})
export class UpdateroundComponent implements OnInit {

  @ViewChild("fechapresentacion") fechapresentacion!: ElementRef;
  @ViewChild("fechaCierre") fechaCierre!: ElementRef;
  @ViewChild("duracion") duracion!: ElementRef;
  @ViewChild("descripcionModulo") descripcionModulo!: ElementRef;
  @ViewChild("fechaLimiteVotacion") fechaLimiteVotacion!: ElementRef;

  public round!: Round;
  public idRound!: number;

  constructor(
    private _serviceRound: ServiceRound,
    private _active: ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
    this._active.params.subscribe((params: Params) => {
      this.idRound = params["idround"];
      this._serviceRound.getRoundById(this.idRound).then(r => {
        this.round = r
        this.fechapresentacion.nativeElement.value = this.round.fechaPresentacion;
        this.fechaCierre.nativeElement.value = this.round.fechaCierre;
        this.duracion.nativeElement.value = this.round.duracion;
        this.descripcionModulo.nativeElement.value = this.round.descripcionModulo;
        this.fechaLimiteVotacion.nativeElement.value = this.round.fechaLimiteVotacion;
      })
    })
  }

  updateRound():void{
    this.round.fechaPresentacion = this.fechapresentacion.nativeElement.value;
    this.round.fechaCierre = this.fechaCierre.nativeElement.value;
    this.round.duracion = this.duracion.nativeElement.value;
    this.round.descripcionModulo = this.descripcionModulo.nativeElement.value;
    this.round.fechaLimiteVotacion = this.fechaLimiteVotacion.nativeElement.value;
    console.log(this.round)
    this._serviceRound.updateRoundById(this.round)
    .then(r => {
      this._router.navigate(["/courses"])
    })
    .catch(r => console.log(r))
  }


}
