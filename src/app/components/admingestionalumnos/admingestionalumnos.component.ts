import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { ServiceAdmin } from '../../services/service.admin';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admingestionalumnos',
  templateUrl: './admingestionalumnos.component.html',
  styleUrls: ['./admingestionalumnos.component.css']
})
export class AdmingestionalumnosComponent implements OnInit {

  @ViewChild('alumnoForm') alumnoForm!: NgForm;

  public allUsers: Array<User> = [];
  public alumnos: Array<User> = [];
  public profesores: Array<User> = [];
  public showAlumnos: boolean = false;
  public showProfesores: boolean = false;
  public isEditing: boolean = false;
  public isEditingProfe: boolean = false;
  public selectedAlumno: User | null = null;
  public selectedProfesor: User | null = null;
  public searchTerm: string = '';

  public paginatedAlumnos: Array<User> = [];
  public paginatedProfesores: Array<User> = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalPages: number = 1;
  public showPopup: boolean = false;
  public showPassword: boolean = false;

  constructor(
    private _service: ServiceAdmin,
    private _router:Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
    this.loadUsers();

  }

  loadUsers(): void {
    this._service.getUsuarios().then(response => {
      this.allUsers = response;
      this.alumnos = this.allUsers.filter(user => user.idRole == 2);
      this.profesores = this.allUsers.filter(user => user.idRole == 1);
      this.totalPages = Math.ceil(this.alumnos.length / this.itemsPerPage);
      this.updatePaginatedAlumnos();
    });
  }

  updatePaginatedAlumnos(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAlumnos = this.alumnos.slice(startIndex, endIndex);
  }
  updatePaginatedProfesor(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProfesores = this.profesores.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedAlumnos();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedAlumnos();
    }
  }

  togglePanel(panel: string): void {
    if (panel === 'alumnos') {
      this.showAlumnos = !this.showAlumnos;
    } else if (panel === 'profesores') {
      this.showProfesores = !this.showProfesores;
    }
  }

  changeEditing(): void {
    if (!this.isEditing) {
      this.isEditing = true;
    } else {
      this.isEditing = false
    }
  }
  changeEditingProfe(): void {
    if (!this.isEditingProfe) {
      this.isEditingProfe = true;
    } else {
      this.isEditingProfe = false
    }
  }

  selectAlumno(alumno: User): void {
    this.selectedAlumno = alumno;
    this.changeEditing();
  }
  selectProfesor(profesor: User): void {
    this.selectedProfesor = profesor;
    this.changeEditingProfe();
  }
  closePopup() {
    this.showPopup = false;
  }

  changeStatus(): void {
    if (this.selectedAlumno) {
      const id = this.selectedAlumno.idUsuario;
      const estado = !this.selectedAlumno.estadoUsuario;
      this._service.updateEstadoAlumno(id, estado).then(response => {
        const index = this.alumnos.findIndex(alumno => alumno.idUsuario === id);
        if (index !== -1) {
          this.alumnos[index].estadoUsuario = estado;
          this.updatePaginatedAlumnos();
          this.changeEditing();
        }
      }).catch(error => {
        console.error("Error al actualizar el estado del alumno:", error);
      });
    } else {
      console.log("No selectedAlumno found.");
    }
  }

  changeStatusProfesor():void{
    if (this.selectedProfesor) {
      const id = this.selectedProfesor.idUsuario;
      const estado = !this.selectedProfesor.estadoUsuario;
      this._service.updateEstadoAlumno(id, estado).then(response => {
        const index = this.profesores.findIndex(profe => profe.idUsuario === id);
        if (index !== -1) {
          this.profesores[index].estadoUsuario = estado;
          this.updatePaginatedProfesor();
          this.changeEditingProfe();
        }
      }).catch(error => {
        console.error("Error al actualizar el estado del profe:", error);
      });
    } else {
      console.log("No selectedProfesor found.");
    }
  }

  deleteUser(): void {
    if (this.selectedAlumno) {
      const id = this.selectedAlumno.idUsuario;
      this._service.deleteUsuario(id).then(response => {
        const index = this.alumnos.findIndex(alumno => alumno.idUsuario === id);
        if (index !== -1) {
          this.alumnos.splice(index, 1);
          this.updatePaginatedAlumnos();
          this.changeEditing();
        }
      }).catch(error => {
        console.error("Error al eliminar el usuario:", error);
      });
    } else {
      console.log("No selectedAlumno found.");
    }
  }

  deleteProfesor(): void {
    if (this.selectedProfesor) {
      const id = this.selectedProfesor.idUsuario;
      console.log(this.selectedProfesor)

      this._service.deleteUsuario(id).then(response => {
        const index = this.alumnos.findIndex(alumno => alumno.idUsuario === id);
        if (index !== -1) {
          this.alumnos.splice(index, 1);
          //this.updatePaginatedAlumnos();
          this.changeEditingProfe();
        }
      }).catch(error => {
        console.error("Error al eliminar el usuario:", error);
      });
    } else {
      console.log("No selectedAlumno found.");
    }
  }
  filterAlumnos(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.alumnos = this.allUsers.filter(user => user.idRole == 2 && user.nombre.toLowerCase().includes(searchTermLower));
    this.totalPages = Math.ceil(this.alumnos.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedAlumnos();
  }
  filterProfesores(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.profesores = this.allUsers.filter(user => user.idRole == 1 && user.nombre.toLowerCase().includes(searchTermLower));
    this.totalPages = Math.ceil(this.profesores.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedProfesor();
}


  updateUsuario(): void {
    if (this.selectedAlumno) {
      const updatedAlumno: User = {
        idUsuario: this.selectedAlumno.idUsuario,
        nombre: this.selectedAlumno.nombre,
        apellidos: this.selectedAlumno.apellidos,
        email: this.selectedAlumno.email,
        estadoUsuario: this.selectedAlumno.estadoUsuario,
        imagen: this.selectedAlumno.imagen,
        password: this.selectedAlumno.password,
        idRole: this.selectedAlumno.idRole
      };
      console.log(this.selectedAlumno.idRole)

  
      this._service.updateUsuario(updatedAlumno).then(response => {
        const index = this.alumnos.findIndex(alumno => alumno.idUsuario === updatedAlumno.idUsuario);
        if (index !== -1) {
          this.alumnos[index] = { ...updatedAlumno };
          this.updatePaginatedAlumnos();
          this.changeEditing();
        }
      }).catch(error => {
        console.error("Error al actualizar el usuario:", error);
      });
    } else {
      console.log("No selectedAlumno found.");
    }
  }

  updateProfesor(): void {
    if (this.selectedProfesor) {
      const updatedProfesor: User = {
        idUsuario: this.selectedProfesor.idUsuario,
        nombre: this.selectedProfesor.nombre,
        apellidos: this.selectedProfesor.apellidos,
        email: this.selectedProfesor.email,
        estadoUsuario: this.selectedProfesor.estadoUsuario,
        imagen: this.selectedProfesor.imagen,
        password: this.selectedProfesor.password,
        idRole: this.selectedProfesor.idRole
      };
  
      this._service.updateUsuario(updatedProfesor).then(response => {
        const index = this.profesores.findIndex(profe => profe.idUsuario === updatedProfesor.idUsuario);
        if (index !== -1) {
          this.profesores[index] = { ...updatedProfesor };
          this.updatePaginatedProfesor();
          this.changeEditingProfe();
        }
      }).catch(error => {
        console.error("Error al actualizar el usuario:", error);
      });
    } else {
      console.log("No selectedProfesor found.");
    }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}