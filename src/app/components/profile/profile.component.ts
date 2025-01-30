import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceUser } from '../../services/service.user';
import { User } from '../../models/user';
import { Charla } from '../../models/charla';
import { ServiceTalks } from '../../services/service.talks';
import { ServiceRound } from '../../services/service.round';
import { ServicePostFiles } from '../../services/service.postfiles';
import { Round } from '../../models/round';
import { FileModel } from '../../models/filemodel';
import { ServiceAdmin } from '../../services/service.admin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @ViewChild("cajafile") cajaFileRef!: ElementRef;
  @ViewChild("cajaPassword") cajaPassRef!: ElementRef;

  public fileContent: string;
  public user !: User;
  public charlas: Array<Charla> = [];
  public rondas: Array<Round> = [];
  public acceptedCharlas: Array<Charla> = [];
  public presentCharlas: Array<Charla> = [];
  public isEditing = false;


  constructor(private _service: ServiceUser,
    private _serviceTalks: ServiceTalks,
    private _serviceRonda: ServiceRound,
    private _serviceFile: ServicePostFiles,
    private _serviceAdmin: ServiceAdmin,
    private _router: Router
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
    }).catch(r => console.log(r.error))

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
      this.checkCharla();
    })

  }

  loadRondas(): void {
    this._serviceRonda.getRounds().then((response) => {
      //console.log(response)
      this.rondas = response
    })
  }

  checkCharla(): void {
    console.log("entra")
    console.log(this.charlas)
    for (let charla of this.charlas) {
      if (charla.idEstadoCharla != 1) {
        console.log(charla.idEstadoCharla)
        this.acceptedCharlas.push(charla)
      } else {
        this.presentCharlas.push(charla)
      }
    }
  }

  editProfile(): void {
    this.isEditing = !this.isEditing;
  }

  subirFichero(): void {

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

  editarDatos(): void {
    var cont = this.cajaPassRef.nativeElement.value;
    var file = this.cajaFileRef.nativeElement.files[0];
    if (!file && !cont) {
      console.warn("nulo");
      alert("Accion invalida");
    } else if (!file && cont) {
      //metodo para actualizar la contraseña
      console.log("archivo NO contraseña SI");
      this.updatePassword(cont);
      this._router.navigate(["/"]);
    } else if (file && !cont) {
      //metodo para actualizar foto de perfil
      console.log("archivo si contraseña no");
      this.subirFichero();
    } else {
      console.log("CONTRASEÑA SI Y ARCHIVO SI");
      this.editProfile();
      this.updatePassword(cont);
    }
  }
  updatePassword(cont: string): void {
    this._serviceAdmin.updatePassword(cont).subscribe(response => {
      console.log(response);
      this._router.navigate(["/"]);
    })
  }
}



