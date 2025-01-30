import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { Curso } from '../../models/curso';
import { ServiceAdmin } from '../../services/service.admin';
import { UserAdmin } from '../../models/useradmin';
import { ServiceTeacher } from '../../services/serivece.teacher';
import { ServiceUser } from '../../services/service.user';
import { FileModel } from '../../models/filemodel';
import { ServicePostFiles } from '../../services/service.postfiles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrl: './perfiladmin.component.css'
})
export class PerfiladminComponent implements OnInit {

  @ViewChild("cajafile") cajaFileRef!: ElementRef;
  @ViewChild("cajaPassword") cajaPassRef!:ElementRef;
  public usuarios: Array<UserAdmin> = [];
  public profesores: Array<UserAdmin> = [];
  public cursos: Array<Curso> = [];
  public alumnos: Array<UserAdmin> = [];
  public user!: User;

  public isEditing = false;
  public fileContent: string;

  public filteredCursos: Curso[] = []; // Charlas filtradas
  public searchText: string = ''; // Término de búsqueda
  constructor(private _serviceAdmin: ServiceAdmin,
    private _serviceFile: ServicePostFiles,
    private _serviceProfile: ServiceUser,
    private _router: Router) {
    this.fileContent = "";
  }

  ngOnInit() {
    this.loadUser();
    this.getCursos();
  }

  mostrarUsuarios(): void {
    this._serviceAdmin.getUsuariosActivos().subscribe(response => {
      this.usuarios = response;
      console.log(response);

      this.alumnos = this.usuarios.filter((usuario) => usuario.idRole === 2);
      this.profesores = this.usuarios.filter((usuario) => usuario.idRole === 1);
    })
  }

  mostrarProfesores(): void {
    this._serviceAdmin.getProfesores().subscribe(response => {
      this.profesores = response;
      console.log(response);
    })
  }

  updateRolUsuarios(idUsuario: number, rol: number): void {
    this._serviceAdmin.updateRolUsuario(idUsuario, rol).subscribe(response => {
      console.log(response);
    })
  }
  updateCursoUsuario(idUsuario: number, idCurso: number): void {
    this._serviceAdmin.updateCursoUsuario(idUsuario, idUsuario).subscribe(response => {
      console.log(response);
      console.log("OK");
    })
  }
  updateEstadoProfesor(idUsuario: number, nuevoEstado: boolean): void {
    this._serviceAdmin.updateEstadoProfesor(idUsuario, nuevoEstado).subscribe(response => {
      console.log(response);

    })
  }

  
  getCursos(): void {
    this._serviceAdmin.getCursos().subscribe(response => {
      this.cursos = response;
      this.filteredCursos=this.cursos;
      console.log(response);
    })
  }

  getUsuariosCurso(idCurso: number): void {
    this.usuarios = new Array<UserAdmin>();
    console.log("entrando");
    this._serviceAdmin.getUsuariosCurso(idCurso).subscribe(response => {
      this.usuarios = response;
      console.log("response");
      this.alumnos = this.usuarios.filter((usuario) => usuario.role === "ALUMNO");
      this.profesores = this.usuarios.filter((usuario) => usuario.role === "PROFESOR");
      console.log(this.profesores);
    })
  }
  loadUser(): void {
    this._serviceProfile.getProfile().then(response => {
      this.user = response.usuario;
    })
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
  editarDatos():void{
    var cont=this.cajaPassRef.nativeElement.value;
    var file = this.cajaFileRef.nativeElement.files[0];
    if(!file && !cont ){
      console.warn("nulo");
      alert("Accion invalida");
    }else if(!file && cont){
      //metodo para actualizar la contraseña
      console.log("archivo NO contraseña SI");
      this.updatePassword(cont);
      this._router.navigate(["/"]);
    }else if(file &&!cont)
    {
      //metodo para actualizar foto de perfil
      console.log("archivo si contraseña no");
      this.subirFichero();
    }else{
      console.log("CONTRASEÑA SI Y ARCHIVO SI");
      this.editProfile();
      this.updatePassword(cont);
    }
  }
  updatePassword(cont:string):void{
    this._serviceAdmin.updatePassword(cont).subscribe(response=>{
      console.log(response);
      this._router.navigate(["/"]);
    })
  }

  filterCursos() {
    const searchTextLower = this.searchText.toLowerCase();
    
    // Filtramos los cursos basándonos en el título que contiene el texto ingresado
    this.filteredCursos = this.cursos.filter(curso =>
      curso.nombre.toLowerCase().includes(searchTextLower)
    );
  }
}
