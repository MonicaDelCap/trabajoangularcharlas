import { Component, OnInit } from '@angular/core';
import { Charla } from '../../models/charla';
import { ServiceUser } from '../../services/service.user';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from '../../models/comentario';

@Component({
  selector: 'app-charla',
  templateUrl: './charla.component.html',
  styleUrl: './charla.component.css'
})
export class CharlaComponent implements OnInit {
  public charla: Charla | null = null;
  public errorMessage: string | null = null;
  public nuevoComentario: string = '';
  public idUsuario: number = 0; // Inicializar el idUsuario

  constructor(private route: ActivatedRoute, private _service: ServiceUser) {}

  ngOnInit(): void {
    // Obtener id del usuario autenticado
    this._service.getProfile()
      .then(profile => {
        this.idUsuario = profile.usuario.idUsuario; // Asignar el idUsuario
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
      this._service.addComentario(this.charla.idCharla, this.idUsuario, this.nuevoComentario.trim())
        .then(() => {
          const nuevoComentario = new Comentario(
            0,
            this.charla!.idCharla,
            this.idUsuario,
            this.nuevoComentario.trim(),
            new Date()
          );
          this.charla!.comentarios.push(nuevoComentario);
          this.nuevoComentario = '';
        })
        .catch(error => console.error('Error al agregar comentario:', error));
    }
  }
}