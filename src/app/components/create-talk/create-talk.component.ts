import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { ServiceTalks } from '../../services/service.talks';
import { Talk } from '../../models/createtalk';
import { ServiceUser } from '../../services/service.user';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceRound } from '../../services/service.round';
import { Round } from '../../models/round';
import { DatePipe } from '@angular/common';
import { Resource } from '../../models/resource';
@Component({
  selector: 'app-create-talk',
  templateUrl: './create-talk.component.html',
  styleUrl: './create-talk.component.css'
})
export class CreateTalkComponent implements OnInit {

  inputs: { nombre: string, url: string, descripcion: string }[] = []; newTalk!: Talk;
  idUser!: number;
  idRonda!: number;
  round !: Round;
  fechaPresentacion !: string;
  imagenPredef: string | ArrayBuffer | null = '';
  newTalkCreate!: Talk;
  newResource !: Resource;

  @ViewChild("titleTalk") titleTalk!: ElementRef;
  @ViewChild("fileupload") fileupload!: ElementRef;
  @ViewChild("duration") duration!: ElementRef;
  @ViewChild("description") description!: ElementRef;
  @ViewChild("inputrecurso") inputrecurso!: ElementRef;
  @ViewChild("clock") clock!: ElementRef;

  constructor(
    private _serviceTalks: ServiceTalks,
    private _active: ActivatedRoute,
    private _serviceRounds: ServiceRound,
    private datePipe: DatePipe,
    private _router: Router
  ) {
    this.newTalk = new Talk(1, "", "", 0, "2025-01-15T12:36:04.757Z", 0, 1, 0, "");
    this.newTalkCreate = new Talk(1, "", "", 0, "2025-01-15T12:36:04.757Z", 0, 1, 0, "");
    this.newResource = new Resource(0, 0, "", "", "");
    this.imagenPredef = "/assets/images/charla.png"
  }

  ngOnInit(): void {
    this._active.params.subscribe((params: Params) => {
      this.idRonda = parseInt(params['id'], 10);
      this._serviceRounds.getRoundById(this.idRonda).then(r => {
        this.round = r
        this.fechaPresentacion = this.convertDate(this.round.fechaPresentacion);
      })
    })
  }

  addInput(): void {
    // Añade un nuevo objeto con campos vacíos
    this.inputs.push({ nombre: '', url: '', descripcion: '' });
  }

  removeInput(index: number): void {
    this.inputs.splice(index, 1);  // Elimina el recurso correspondiente
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0]; // Obtén el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPredef = reader.result; // Guarda la imagen como Base64 o URL de la imagen
      };
      reader.readAsDataURL(file); // Esto generará una URL que se puede usar en src de la imagen
    }
  }

  createTalk(): void {
    console.log('Inicio de createTalk');
    this.newTalk.titulo = this.titleTalk.nativeElement.value;
    this.newTalk.descripcion = this.description.nativeElement.value;
    this.newTalk.tiempo = this.convertTimeInMinutes(this.duration.nativeElement.value);

    if (this.checkDuration(this.round.duracion, this.newTalk.tiempo)) {
      this.newTalk.idUsuario = environment.idUsuario;
      this.newTalk.idRonda = this.idRonda;
      this.newTalk.imagenCharla = this.fileupload.nativeElement.value;

      this._serviceTalks.createTalk(this.newTalk)
        .then(r => {
          this.newTalkCreate = r;
          for (let input of this.inputs) {
            this.newResource = new Resource(0, this.newTalkCreate.idCharla, input.url, input.nombre, input.descripcion);
            this._serviceTalks.createResourceForTalk(this.newResource).then(r => console.log(r))
          }
          this._router.navigate(["/studentround/", this.round.idRonda])
        })
    } else {
      this.changeDurationColor();
    }
  }

  convertTimeInMinutes(duration: string): number {
    let [horas, minutos] = duration.split(":").map(Number);
    return horas * 60 + minutos;
  }

  convertDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  checkDuration(durationTalk: number, durationUser: number): boolean {
    if (durationUser > durationTalk) {
      return false
    }
    return true;
  }

  changeDurationColor(): void {
    let nameInput = this.duration.nativeElement;
    nameInput.style.background = '#D58787';
  }

  changeAllInputColorRegisterInit(): void {
    let passwordRepeat = this.duration.nativeElement;
    passwordRepeat.style.border = '2px solid white';
    passwordRepeat.style.color = 'black';

  }

  changeImage(): void {
    document.getElementById('file-upload')?.click();
  }






}
