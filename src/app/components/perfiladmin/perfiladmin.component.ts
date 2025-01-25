import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Curso } from '../../models/curso';
import { ServiceAdmin } from '../../services/service.admin';
import { UserAdmin } from '../../models/useradmin';

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrl: './perfiladmin.component.css'
})
export class PerfiladminComponent {
  public usuarios:Array<UserAdmin>=[];
  public profesores:Array<UserAdmin>=[];
  public cursos:Array<Curso>=[];
  public alumnos:Array<UserAdmin>=[];

  constructor(private _serviceAdmin:ServiceAdmin) {

   }

  ngOnInit() {
    //this.mostrarUsuarios();
    //this.mostrarProfesores();
    this.getCursos();
  }

  mostrarUsuarios():void{
    this._serviceAdmin.getUsuariosActivos().subscribe(response=>{
      this.usuarios=response;
      console.log(response);
      
      this.alumnos=this.usuarios.filter((usuario)=>usuario.idRole===2);
      this.profesores=this.usuarios.filter((usuario)=>usuario.idRole===1);
    })
  }

  mostrarProfesores():void{
    this._serviceAdmin.getProfesores().subscribe(response=>{
      this.profesores=response;
      console.log(response);
    })
  }

  updateRolUsuarios(idUsuario:number,rol:number):void{
    this._serviceAdmin.updateRolUsuario(idUsuario,rol).subscribe(response=>{
      console.log(response);
    })
  }
  updateCursoUsuario(idUsuario:number,idCurso:number):void{
    this._serviceAdmin.updateCursoUsuario(idUsuario, idUsuario).subscribe(response=>{
      console.log(response);
      console.log("OK");
    })
  }
  updateEstadoProfesor(idUsuario:number,nuevoEstado:boolean):void{
    this._serviceAdmin.updateEstadoProfesor(idUsuario,nuevoEstado).subscribe(response=>{
      console.log(response);

    })    
  }

  detalleUsuario(id:number):void{

  }
  getCursos():void{
    this._serviceAdmin.getCursos().subscribe(response=>{
      this.cursos=response;
      console.log(response);
    })
  }

  getUsuariosCurso(idCurso:number):void{
    this.usuarios=new Array<UserAdmin>();
    console.log("entrando");
    this._serviceAdmin.getUsuariosCurso(idCurso).subscribe(response=>{
      this.usuarios=response;
      console.log("response");
      this.alumnos=this.usuarios.filter((usuario)=>usuario.role==="ALUMNO");
      this.profesores=this.usuarios.filter((usuario)=>usuario.role==="PROFESOR");
      console.log(this.profesores);
    })
  }
}
