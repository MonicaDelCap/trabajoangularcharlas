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
import { DatePipe } from '@angular/common';

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
    private _router: Router,
    private datePipe: DatePipe
  ) {
    this.fileContent = "";
  }

  ngOnInit() {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
    this.loadUser();
    this.getCursos();
  }
  
  convertDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  mostrarUsuarios(): void {
    this._serviceAdmin.getUsuariosActivos().subscribe(response => {
      this.usuarios = response;
      this.alumnos = this.usuarios.filter((usuario) => usuario.idRole === 2);
      this.profesores = this.usuarios.filter((usuario) => usuario.idRole === 1);
    })
  }

  mostrarProfesores(): void {
    this._serviceAdmin.getProfesores().subscribe(response => {
      this.profesores = response;
    })
  }

  updateRolUsuarios(idUsuario: number, rol: number): void {
    this._serviceAdmin.updateRolUsuario(idUsuario, rol).subscribe(response => {
    })
  }
  updateCursoUsuario(idUsuario: number, idCurso: number): void {
    this._serviceAdmin.updateCursoUsuario(idUsuario, idUsuario).subscribe(response => {
    })
  }
  updateEstadoProfesor(idUsuario: number, nuevoEstado: boolean): void {
    this._serviceAdmin.updateEstadoProfesor(idUsuario, nuevoEstado).subscribe(response => {
    })
  }

  
  getCursos(): void {
    this._serviceAdmin.getCursos().subscribe(response => {
      this.cursos = response;
      for(let cur of this.cursos){
      }
      this.filteredCursos=this.cursos;
    })
  }

  getUsuariosCurso(idCurso: number): void {
    this.usuarios = new Array<UserAdmin>();
    this._serviceAdmin.getUsuariosCurso(idCurso).subscribe(response => {
      this.usuarios = response;
      this.alumnos = this.usuarios.filter((usuario) => usuario.role === "ALUMNO");
      this.profesores = this.usuarios.filter((usuario) => usuario.role === "PROFESOR");
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
      alert("Accion invalida");
    }else if(!file && cont){
      //metodo para actualizar la contraseña
      this.updatePassword(cont);
      this._router.navigate(["/"]);
    }else if(file &&!cont)
    {
      //metodo para actualizar foto de perfil
      this.subirFichero();
    }else{
      this.editProfile();
      this.updatePassword(cont);
    }
  }
  updatePassword(cont:string):void{
    this._serviceAdmin.updatePassword(cont).subscribe(response=>{
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
