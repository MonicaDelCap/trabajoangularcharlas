import { Component, Inject, OnInit } from '@angular/core';
import { Charla } from '../../models/charla';
import { ServiceTeacher } from '../../services/serivece.teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student';

@Component({
  selector: 'app-teacher-ronda',
  templateUrl: './teacher-ronda.component.html',
  styleUrl: './teacher-ronda.component.css'
})
export class TeacherRondaComponent implements OnInit {
  idRonda!: number;
  idCurso!: number;
  charlasPropuestas: Charla[] = [];
  charlasAceptadas: Charla[] = [];
  draggedCharla: Charla | null = null;
  // Variables para el popup
  mostrarPopup: boolean = false;
  mensajePopup: string = '';

  votosPropuestos: number = 0; // Total de votos de las charlas propuestas
  totalVotos: number = 0; // Total de votos posibles

  constructor(
    private route: ActivatedRoute,
    private _serviceTeacher: ServiceTeacher,
    private dialog: MatDialog,
    private _router:Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.idRonda = Number(this.route.snapshot.paramMap.get('idRonda'));
    this.idCurso = Number(this.route.snapshot.paramMap.get('idCurso'));
    this.cargarCharlas();
    this.cargarAlumnos();
    
  }
  async cargarAlumnos(): Promise<void> {
    const alumnosPorCurso: any[] = await this._serviceTeacher.getAlumnos();
    this.idCurso = this.charlasPropuestas[0].idCurso
    // Buscamos el curso que coincide con el idCurso de la ruta
    const curso = alumnosPorCurso.find(curso => curso.curso.idCurso === this.idCurso);
    this.idCurso = this.charlasPropuestas[0].idCurso

    // Si encontramos el curso, asignamos el número de alumnos
    if (curso) {
        this.totalVotos = curso.numeroAlumnos;  // Correctamente asignamos el número de alumnos
    } else {
        console.error("Curso no encontrado");
    }
  }
  async cargarCharlas(): Promise<void> {
    try {
      const charlas: Charla[] = await this._serviceTeacher.getCharlasRonda(this.idRonda);
      this.charlasPropuestas = charlas.filter((charla) => charla.idEstadoCharla === 1);
      this.charlasAceptadas = charlas.filter((charla) => charla.idEstadoCharla === 2);

      // Procesar votos para charlas propuestas
      for (const charla of this.charlasPropuestas) {
        const charlaConVotos = await this._serviceTeacher.getVotosCharla(charla.idCharla);
        charla.votos = charlaConVotos.votos ?? 0;
        this.votosPropuestos += charla.votos; 
      }
      
      this.charlasPropuestas.sort((a, b) => b.votos - a.votos);

      // Procesar votos para charlas aceptadas
      for (const charla of this.charlasAceptadas) {
        const charlaConVotos = await this._serviceTeacher.getVotosCharla(charla.idCharla);
        charla.votos = charlaConVotos.votos ?? 0;
        this.votosPropuestos += charla.votos; 
      }
      
      this.charlasAceptadas.sort((a, b) => b.votos - a.votos);
    } catch (error) {
      console.error("Error al obtener las charlas de la ronda:", error);
    }
  }

  abrirConfirmacionGuardar(): void {
    this.mostrarPopup = true;
    this.mensajePopup = '¿Está seguro de que desea guardar los cambios?';
  }

  abrirConfirmacionCancelar(): void {
    this.mostrarPopup = true;
    this.mensajePopup = '¿Está seguro de que desea cancelar los cambios?';
  }

  confirmarAccion(): void {
    if (this.mensajePopup === '¿Está seguro de que desea guardar los cambios?') {
      this.guardarCambios();
      this._router.navigate(["/courses"])
    } else if (this.mensajePopup === '¿Está seguro de que desea cancelar los cambios?') {
      this.cancelarCambios();
    }
    this.cerrarPopup();
  }

  cerrarPopup(): void {
    this.mostrarPopup = false;
  }


  // Guardar cambios
  guardarCambios(): void {
    let updatedCharlas = this.charlasAceptadas.map(charla => {
      return {
        idCharla: charla.idCharla,
        titulo: charla.titulo,
        descripcion: charla.descripcion,
        tiempo: charla.tiempo,
        fechaPropuesta: charla.fechaPropuesta,
        idUsuario: charla.idUsuario,
        idEstadoCharla: charla.idEstadoCharla,
        idRonda: charla.idRonda,
        imagenCharla: charla.imagenCharla
      };
    });

    updatedCharlas.forEach(charla => {
      this._serviceTeacher.updateCharla(charla).then(response => {
        console.log("Charla actualizada", response);
      }).catch(error => {
        console.error("Error actualizando charla", error);
      });
    });
  }

  // Cancelar cambios
  cancelarCambios(): void {
    this._router.navigate(["/courses"])
  }

  onDragStart(event: DragEvent, charla: Charla): void {
    this.draggedCharla = charla;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetList: 'propuestas' | 'aceptadas'): void {
    if (this.draggedCharla) {
      if (targetList === 'propuestas') {
        const charlaExistente = this.charlasPropuestas.some(c => c.idCharla === this.draggedCharla?.idCharla);
        if (!charlaExistente) {
          this.charlasAceptadas = this.charlasAceptadas.filter(c => c.idCharla !== this.draggedCharla?.idCharla);
          this.charlasPropuestas.push(this.draggedCharla);
          this.draggedCharla.idEstadoCharla = 1;
          this.charlasPropuestas.sort((a, b) => b.votos - a.votos);
        }
      } else {
        const charlaExistente = this.charlasAceptadas.some(c => c.idCharla === this.draggedCharla?.idCharla);
        if (!charlaExistente) {
          this.charlasPropuestas = this.charlasPropuestas.filter(c => c.idCharla !== this.draggedCharla?.idCharla);
          this.charlasAceptadas.push(this.draggedCharla);
          this.draggedCharla.idEstadoCharla = 2;
        }
      }
      this.draggedCharla = null;
    }
  }
}