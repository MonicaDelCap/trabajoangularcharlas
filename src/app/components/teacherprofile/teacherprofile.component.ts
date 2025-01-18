import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceUser } from '../../services/service.user';
import { User } from '../../models/user';
import { Charla } from '../../models/charla';
import { ServiceTalks } from '../../services/service.talks';
import { ServiceRound } from '../../services/service.round';
import { ServicePostFiles } from '../../services/service.postfiles';
import { Round } from '../../models/round';
import { FileModel } from '../../models/filemodel';
import { ServiceTeacher } from '../../services/serivece.teacher';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfMonth, addDays, endOfMonth, subMonths, addMonths } from 'date-fns';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrl: './teacherprofile.component.css'
})
export class TeacherprofileComponent implements OnInit {
  @ViewChild("cajafile") cajaFileRef!: ElementRef;

  view: CalendarView = CalendarView.Month;  // Vista inicial (puede ser mes, semana, día)
  viewDate: Date = new Date();  // Fecha activa del calendario
  events: CalendarEvent[] = [];  // Lista de eventos que se mostrarán
  activeDayIsOpen: boolean = true;
  showAlumnos: boolean = false;  // Controla la visibilidad de la tabla de alumnos

  public fileContent: string;
  public user !: User;
  public charlas: Array<Charla> = [];
  public rondas: Array<Round> = [];
  public cursos: Array<any> = [];
  public alumnos: Array<any> = [];
  public paginatedAlumnos: Array<any> = [];
  public isEditing = false;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalPages: number = 1;
  public selectedCurso: string = '';  // Propiedad para almacenar el valor seleccionado

  constructor(private _service: ServiceUser,
    private _serviceFile: ServicePostFiles,
    private _serviceTeacher: ServiceTeacher
  ) {
    this.fileContent = "";
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadCursos();
    this.loadRondas();
    this.loadAlumnos();
  }

  loadUser(): void {
    this._service.getProfile().then(response => {
      this.user = response.usuario;
    })
  }
  loadCursos(): void {
    this._serviceTeacher.getCursos().then(response => {
      this.cursos = response
    })
  }
  loadRondas(): void {
    this._serviceTeacher.getRondas().then(response => {
      this.rondas = response;
      this.updateCalendarEvents();
    })
  }
  loadAlumnos(): void {
    this._serviceTeacher.getAlumnos().then(response => {
      this.alumnos = response[0].alumnos;
      this.totalPages = Math.ceil(this.alumnos.length / this.itemsPerPage);
      this.updatePaginatedAlumnos();
    })
  }
  updateCalendarEvents(): void {
    this.events = this.rondas.flatMap(ronda => [
      {
        title: 'Presentación: ' + ronda.descripcionModulo,
        start: new Date(ronda.fechaPresentacion),
        color: { primary: '#1e90ff', secondary: '#D1E8FF' } // Color para la fecha de presentación
      },
      {
        title: 'Cierre de votación: ' + ronda.descripcionModulo,
        start: new Date(ronda.fechaCierre),
        color: { primary: '#ff5722', secondary: '#FFCDD2' } // Color para la fecha de cierre
      }
    ]);
  }

  updatePaginatedAlumnos(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAlumnos = this.alumnos.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedAlumnos();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedAlumnos();
    }
  }

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.updateCalendarEvents();
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.updateCalendarEvents();
  }

  toggleAlumnos(): void {
    this.showAlumnos = !this.showAlumnos;
  }

  onCursoChange(): void {
    // Aquí puedes realizar la acción condicional basada en el valor seleccionado
    if (this.selectedCurso === 'curso1') {
      // Acción para curso1
      console.log('Curso 1 seleccionado');
    } else if (this.selectedCurso === 'curso2') {
      // Acción para curso2
      console.log('Curso 2 seleccionado');
    } else {
      // Acción para otros cursos
      console.log('Otro curso seleccionado');
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