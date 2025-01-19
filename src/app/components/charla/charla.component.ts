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
  public esPropietario: boolean = false;
  public charlaEditada: Partial<Charla> = {};
  public modalEditarAbierto: boolean = false;

  // Agrega la referencia a la lista de comentarios
  @ViewChild('comentariosContainer') comentariosContainer: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private _service: ServiceUser) {}

  ngOnInit(): void {
    // Obtener id del usuario autenticado
    this._service.getProfile()
      .then(profile => {
        this.idUsuario = profile.usuario.idUsuario;
        console.log(this.idUsuario);
        this.usuario= profile.usuario.nombre;
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this._service.getCharlaById(id).then((charla) => {
            this.charla = charla;
            this.charlaEditada = { ...charla };
            this.esPropietario = charla.idUsuario === this.idUsuario; // Verificar si es propietario
            console.log(this.esPropietario)
            console.log(charla.idUsuario)
            console.log(this.idUsuario)
          });
        }
      })
      .catch(error => {
        console.error('Error al obtener el perfil:', error);
      });
  }
  abrirModalEditar(): void {
    this.modalEditarAbierto = true;
  } 
  cerrarModalEditar(): void {
    this.modalEditarAbierto = false;
  }
  guardarCambios(): void {
    if (this.charla) {
      this._service.updateCharla(this.charlaEditada).then(() => {
        Object.assign(this.charla!, this.charlaEditada);
        this.modalEditarAbierto = false;
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
