import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceUser } from '../../services/service.user';
import { User } from '../../models/user';
import { Charla } from '../../models/charla';
import { ServicePostFiles } from '../../services/service.postfiles';
import { Round } from '../../models/round';
import { FileModel } from '../../models/filemodel';
import { ServiceTeacher } from '../../services/serivece.teacher';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import esLocale from '@fullcalendar/core/locales/es';
@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {
  @ViewChild("cajafile") cajaFileRef!: ElementRef;

  activeDayIsOpen: boolean = true;
  showAlumnos: boolean = false;

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
  public selectedCurso: string = '';

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: []
    ,
    eventDidMount: (info) => {
      info.el.style.textDecoration = 'none'; // Quita subrayado
      info.el.style.color = 'black'; // Pone el texto negro
    }
  };

  constructor(private _service: ServiceUser,
    private _serviceFile: ServicePostFiles,
    private _serviceTeacher: ServiceTeacher,
    private router: Router
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
    });
  }

  loadCursos(): void {
    this._serviceTeacher.getCursos().then(response => {
      this.cursos = response;
    });
  }

  loadRondas(): void {
    this._serviceTeacher.getRondas().then(response => {
      this.rondas = response;
      this.updateCalendarEvents();
    });
  }

  loadAlumnos(): void {
    this._serviceTeacher.getAlumnos().then(response => {
      this.alumnos = response[0].alumnos;
      this.totalPages = Math.ceil(this.alumnos.length / this.itemsPerPage);
      this.updatePaginatedAlumnos();
    });
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

  toggleAlumnos(): void {
    this.showAlumnos = !this.showAlumnos;
  }

  editProfile(): void {
    this.isEditing = !this.isEditing;
  }

  updateCalendarEvents(): void {
    const colores = ['#7C4DFF', '#90CAF9', '#C5E1A5', '#FFB74D', '#FF7043'];

    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.rondas.map((ronda, index) => {
        const color = colores[index % colores.length]; // Asigna un color cíclico basado en el índice
        const fechaCierre = new Date(ronda.fechaCierre);

        // Añadimos un día al cierre
        fechaCierre.setDate(fechaCierre.getDate() + 1);

        return [
          {
            title: "Ronda " + ronda.idRonda + " - " + ronda.descripcionModulo,
            start: this.formatDate(ronda.fechaLimiteVotacion),
            end: this.formatDate(fechaCierre.toISOString()),
            allDay: true,
            description: 'Repeating Event',
            backgroundColor: color, // Color de fondo para el evento
            url: `/teacher/ronda/${ronda.idRonda}`
          },
          {
            title: "Fin de votación - Ronda " + ronda.idRonda,
            start: this.formatDate(ronda.fechaLimiteVotacion),  // Fecha de fin de votación
            allDay: true,                                      // Evento de día completo
            description: 'Evento de fin de votación',          // Descripción para el evento
            backgroundColor: color, // Color de fondo para el evento
            url: `/teacher/ronda/${ronda.idRonda}`
          },
          {
            title: "Cierre - Ronda " + ronda.idRonda,
            start: this.formatDate(ronda.fechaCierre),         // Fecha de cierre
            allDay: true,                                      // Evento de día completo
            description: 'Evento de cierre',                   // Descripción para el evento
            backgroundColor: color, // Color de fondo para el evento
            url: `/teacher/ronda/${ronda.idRonda}`
          }
        ];
      }).flat()  // Aplanar el array para que todos los eventos estén en un solo array
    };
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString();
  }

  onCursoChange(): void {
    if (this.selectedCurso === 'curso1') {
      console.log('Curso 1 seleccionado');
    } else if (this.selectedCurso === 'curso2') {
      console.log('Curso 2 seleccionado');
    } else {
      console.log('Otro curso seleccionado');
    }
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
