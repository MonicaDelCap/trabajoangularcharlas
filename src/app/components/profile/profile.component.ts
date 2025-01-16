import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceUser } from '../../services/service.user';
import { User } from '../../models/user';
import { Charla } from '../../models/charla';
import { ServiceTalks } from '../../services/service.talks';
import { ServiceRound } from '../../services/service.round';
import { ServicePostFiles } from '../../services/service.postfiles';
import { Round } from '../../models/round';
import { FileModel } from '../../models/filemodel';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @ViewChild("cajafile") cajaFileRef!: ElementRef;

  public fileContent: string;
  public user !: User;
  public charlas: Array<Charla> = [];
  public rondas: Array<Round> = [];
  public acceptedCharlas: Array<Charla> = [];
  public isEditing = false;


  constructor(private _service: ServiceUser,
    private _serviceTalks: ServiceTalks,
    private _serviceRonda: ServiceRound,
    private _serviceFile: ServicePostFiles
  ) {
    this.fileContent = "";
  }

  ngOnInit(): void {
    this.loadUser()
    this.loadCharlas();
    this.loadRondas();

  }



  loadUser(): void {
    this._service.getProfile().then(response => {
      this.user = response.usuario;
    })

  }

  loadCharlas(): void {
    this._serviceTalks.getCharlaAlumno().subscribe(response => {
      this.charlas = response.data.map((item: any) => {
        const charla = item.charla;
        return new Charla(
          charla.descripcion,
          charla.estadoCharla,
          new Date(charla.fechaPropuesta),
          charla.idCharla,
          charla.idCurso,
          charla.idEstadoCharla,
          charla.idRonda,
          charla.idUsuario,
          charla.imagenCharla,
          charla.nombreCurso,
          charla.tiempo,
          charla.titulo,
          charla.usuario
        );
      });
    })
    this.checkCharla();
  }

  loadRondas(): void {
    this._serviceRonda.getRounds().then((response) => {
      //console.log(response)
      this.rondas = response
    })
  }

  checkCharla(): void {
    for (let i = 0; i < this.charlas.length; i++) {
      if (this.charlas[i].idEstadoCharla != 1) {
        this.acceptedCharlas.push(this.charlas[i])
      }
    }
  }

  editProfile(): void {
    this.isEditing = !this.isEditing;
  }

  subirFichero(event: any): void {

    var file = this.cajaFileRef.nativeElement.files[0];
    var miPath = this.cajaFileRef.nativeElement.value.split("\\");
    var ficheroNombre = miPath[2];
    console.log(ficheroNombre);

    var reader = new FileReader();
    //reader.readAsDataURL(file);
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      let buffer: ArrayBuffer;
      buffer = reader.result as ArrayBuffer;
      var base64: string;
      base64 = btoa(
        new Uint8Array(buffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      this.fileContent = base64;
      var newFileModel =
        new FileModel(ficheroNombre, base64);
      this._serviceFile.postFileUser(newFileModel, this.user.idUsuario).subscribe(response => {
        console.log(response.urlFile)
        const newImageUrl = response.urlFile + "?t=" + new Date().getTime();
        this.user.imagen = newImageUrl;
        this.editProfile();
      })
    };
  }

 
}
