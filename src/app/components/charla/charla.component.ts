import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Charla } from '../../models/charla';
import { ServiceUser } from '../../services/service.user';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from '../../models/comentario';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Voto {
  idVoto: number;
  idCharla: number;
  idUsuario: number;
  idRonda: number;
}

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
  public isVoted: boolean = false;
  public alreadyVotedInRound: boolean = false;
  public votedCharlaTitle: string | null = null;
  



  // Agrega la referencia a la lista de comentarios
  @ViewChild('comentariosContainer') comentariosContainer: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private _service: ServiceUser, private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    // Obtener id del usuario autenticado
    this._service.getProfile()
      .then(profile => {
        this.idUsuario = profile.usuario.idUsuario;
        console.log(this.idUsuario);
        this.usuario = profile.usuario.nombre;
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this._service.getCharlaById(id).then((charla) => {
            this.charla = charla;
            this.charlaEditada = { ...charla };
            this.esPropietario = charla.idUsuario === this.idUsuario; // Verificar si es propietario
            console.log("Pasa por aqui ")
            this.checkVoteStatus();
          });
        }
      })
      .catch(error => {
        console.error('Error al obtener el perfil:', error);
      });

  }

  async checkVoteStatus(): Promise<void> {
    try {
      // Obtener los votos del alumno
      const votosAlumno = await this._service.getVotosAlumno();
      
      // Verificar si ya votó por esta charla
      const charlaVotada = votosAlumno.some((voto: Voto) => voto.idCharla === this.charla?.idCharla && voto.idUsuario === this.idUsuario);
      if (charlaVotada) {
        this.isVoted = true;
        return;
      }
  
      // Verificar si ya votó en la misma ronda
      const rondaVotada = votosAlumno.some((voto: Voto) => voto.idRonda === this.charla?.idRonda && voto.idUsuario === this.idUsuario);
      if (rondaVotada) {
        this.alreadyVotedInRound = true;
        // Mostrar popup con la charla que ya votó en esta ronda
        const charlaVotadaEnRonda = votosAlumno.find((voto: Voto) => voto.idRonda === this.charla?.idRonda && voto.idUsuario === this.idUsuario);
        if (charlaVotadaEnRonda) {
          const charlaTitulo = await this._service.getCharlaById(charlaVotadaEnRonda.idCharla);
          this.votedCharlaTitle = charlaTitulo?.titulo || 'Una charla';
        }
      }
    } catch (error) {
      console.error('Error al verificar el estado del voto:', error);
      this.snackBar.open('No se pudo verificar el estado del voto. Por favor, inténtalo más tarde.', 'Cerrar');
    }
  }
  async attemptVote(): Promise<void> {
    if (this.alreadyVotedInRound && !this.isVoted) {
      this.snackBar.open(
        `Ya votaste en esta ronda por la charla: "${this.votedCharlaTitle}"`,
        'Cerrar',
        { duration: 5000 }
      );
      return;
    }
  
    if (this.charla) {
      try {
        await this._service.voteForCharla(this.charla.idCharla, this.idUsuario, this.charla.idRonda);
        this.isVoted = true;
        this.snackBar.open('Tu voto fue registrado con éxito.', 'Cerrar', { duration: 3000 });
      } catch (error) {
        console.error('Error al registrar el voto:', error);
        this.snackBar.open('No se pudo registrar tu voto. Inténtalo de nuevo.', 'Cerrar');
      }
    }
  }

  async voteForCharla(): Promise<void> {
    if (this.charla) {
      this._service.voteForCharla(this.charla.idCharla, this.idUsuario, this.charla.idRonda).then(() => {
        this.isVoted = true;
        this.snackBar.open('¡Tu voto ha sido registrado!', 'Cerrar', { duration: 3000 });
      });
    }

  }




  abrirModalEditar(): void {
    this.modalEditarAbierto = true;
  }
  cerrarModalEditar(): void {
    this.modalEditarAbierto = false;
  }
  async guardarCambios(): Promise<void> {
    if (this.charla) {
      this._service.updateCharla(this.charlaEditada).then(() => {
        Object.assign(this.charla!, this.charlaEditada);
        this.modalEditarAbierto = false;
      });
    }
  }

  async agregarComentario(): Promise<void> {
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
