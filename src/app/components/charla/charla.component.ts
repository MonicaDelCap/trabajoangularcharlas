import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Charla } from '../../models/charla';
import { ServiceUser } from '../../services/service.user';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from '../../models/comentario';

@Component({
  selector: 'app-charla',
  templateUrl: './charla.component.html',
  styleUrls: ['./charla.component.css']
})
export class CharlaComponent implements OnInit, AfterViewChecked {
  public charla: Charla | null = null;
  public errorMessage: string | null = null;
  public nuevoComentario: string = '';
  public idUsuario: number = 0; // Inicializar el idUsuario
  public usuario: string = '';

  // Agrega la referencia a la lista de comentarios
  @ViewChild('comentariosContainer') comentariosContainer: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private _service: ServiceUser) {}

  ngOnInit(): void {
    // Obtener id del usuario autenticado
    this._service.getProfile()
      .then(profile => {
        this.idUsuario = profile.usuario.idUsuario; // Asignar el idUsuario
        this.usuario= profile.usuario.nombre
      })
      .catch(error => {
        console.error('Error al obtener el perfil:', error);
      });

    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this._service.getCharlaById(id).then((charla) => {
        this.charla = charla;
      }).catch((error) => {
        this.errorMessage = 'No se pudo cargar la charla. Por favor, inténtelo más tarde.';
        console.error('Error al cargar la charla:', error);
      });
    }
  }

  agregarComentario(): void {
    if (this.charla && this.nuevoComentario.trim()) {
      this._service.addComentario(this.charla.idCharla, this.idUsuario, this.usuario, this.nuevoComentario.trim())
        .then(() => {
          const nuevoComentario = new Comentario(
            0,
            this.charla!.idCharla,
            this.idUsuario,
            this.usuario,
            this.nuevoComentario.trim(),
            new Date()
          );
          this.charla!.comentarios.push(nuevoComentario);
          this.nuevoComentario = '';
        })
        .catch(error => console.error('Error al agregar comentario:', error));
    }
  }

  // Método que se ejecuta después de que Angular actualiza la vista
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // Método para hacer scroll al último comentario
  private scrollToBottom(): void {
    if (this.comentariosContainer) {
      const container = this.comentariosContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
