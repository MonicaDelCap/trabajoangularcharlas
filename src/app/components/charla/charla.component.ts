import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Charla } from '../../models/charla';
import { ServiceUser } from '../../services/service.user';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comentario } from '../../models/comentario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recurso } from '../../models/recurso';
import { FileModel } from '../../models/filemodel';
import { ServiceTalks } from '../../services/service.talks';

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
  public idCharla: number = 0;

  public showVoteConfirm: boolean = false;
  public alreadyVotedInRound: boolean = false;
  public votedCharlaTitle: string | null = null;
  public isDropdownOpen: boolean = false;

  imagenPredef: string | ArrayBuffer | null = '';

  public imagenServer: FileModel = new FileModel("", "");
  @ViewChild("fileupload") fileupload !: ElementRef
  // Agrega la referencia a la lista de comentarios
  @ViewChild('comentariosContainer') comentariosContainer: ElementRef | undefined;

  constructor(private route: ActivatedRoute,
    private _service: ServiceUser,
    private snackBar: MatSnackBar,
    private _serviceTalks: ServiceTalks,
    private _router: Router) { }

  async ngOnInit(): Promise<void> {
    // Obtener id del usuario autenticado
    this._service.getProfile()
      .then(profile => {
        this.idUsuario = profile.usuario.idUsuario;
        this.usuario = profile.usuario.nombre;
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this._service.getCharlaById(id).then((charla) => {
            this.charla = charla;
            console.log(charla)
            this.charlaEditada = { ...charla };
            this.esPropietario = charla.idUsuario === this.idUsuario; // Verificar si es propietario
            this.checkVoteStatus();
          });
        }
      })
      .catch(error => {
        console.error('Error al obtener el perfil:', error);
      });

    this.route.params.subscribe((params: Params) => {
      this.idCharla = params["id"];
    })



  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
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
    this.showVoteConfirm = true;
  }
  // Método para confirmar el voto
  confirmVote(): void {
    this.isVoted = true;  // Marca que ha votado
    this.showVoteConfirm = false;  // Cierra el modal
    if (this.charla) {
      try {
        this._service.voteForCharla(this.charla.idCharla, this.idUsuario, this.charla.idRonda);
        this.isVoted = true;
        this.snackBar.open('Tu voto fue registrado con éxito.', 'Cerrar', { duration: 3000 });
      } catch (error) {
        console.error('Error al registrar el voto:', error);
        this.snackBar.open('No se pudo registrar tu voto. Inténtalo de nuevo.', 'Cerrar');
      }
    }
  }

  // Método para cancelar la acción y cerrar el modal
  cancelVote(): void {
    this.showVoteConfirm = false;
  }






  abrirModalEditar(): void {
    this.modalEditarAbierto = true;
  }

  cerrarModalEditar(): void {
    this.modalEditarAbierto = false;
  }

  async guardarCambios(): Promise<void> {
    try {

      // Detectar si hay cambios en los campos de la charla (excluyendo imagenCharla)
      const hayCambiosEnCharla = Object.keys(this.charlaEditada).some(key => {
        // Ignorar el campo de imagenCharla en la comparación
        if (key === 'imagenCharla') return false;
        return this.charla && this.charla[key as keyof Charla] !== this.charlaEditada[key as keyof Charla];
      });

      // Detectar si hay una nueva imagen seleccionada
      const hayNuevaImagen = this.fileupload.nativeElement.files.length > 0;

      if (hayNuevaImagen) {
        console.log("imagen actualizada")
        await this.subirFichero(hayCambiosEnCharla);
      }

      if (hayCambiosEnCharla) {
        console.log("charla actualizada")
        this.charlaEditada.imagenCharla = this.charla?.imagenCharla;
        console.log("charla editada" + this.charlaEditada)
        // Si hay cambios en la charla (excluyendo imagenCharla), actualizar la charla
        await this._service.updateCharla(this.charlaEditada)
        
      }





      if (hayNuevaImagen && !hayCambiosEnCharla) {
        // Si hay una nueva imagen pero no hay cambios en la charla, subir solo la imagen
        await this.subirFichero(false);
        this.snackBar.open("Imagen subida con éxito.", "Cerrar", { duration: 3000 });
      }

      if (!hayCambiosEnCharla && !hayNuevaImagen) {
        // Si no hay cambios ni en la charla ni en la imagen
        this.snackBar.open("No se detectaron cambios para guardar.", "Cerrar", { duration: 3000 });
      }

      // this.modalEditarAbierto = false;
      location.reload();
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      this.snackBar.open("Error al guardar cambios. Inténtalo de nuevo.", "Cerrar", { duration: 3000 });
    }
  }



  onImageSelect(event: any): void {
    const file = event.target.files[0]; // Obtén el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Verifica que reader.result no sea null y que sea una cadena antes de asignarlo
        if (typeof reader.result === 'string') {
          this.charlaEditada.imagenCharla = reader.result;
        } else {
          console.error('El resultado de la lectura no es una cadena');
        }
      };
      reader.readAsDataURL(file); // Esto generará una URL que se puede usar en src de la imagen
    }
  }


  async subirFichero(cambiosCharla: boolean): Promise<void> {
    let path = this.fileupload.nativeElement.value.split("\\");

    let file = this.fileupload.nativeElement.files[0];
    let fileName = path[2];
    if (fileName != null) {
      // Leer el archivo como Base64
      let reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        let buffer: ArrayBuffer;
        buffer = reader.result as ArrayBuffer;
        var base64: string;
        base64 = btoa(
          new Uint8Array(buffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        this.imagenServer = new FileModel(fileName, base64);
        console.log(this.imagenServer);
        this._serviceTalks.createPostFileTalk(this.imagenServer, this.idCharla).then(r => {
          
        })
      };
    } else {
      this.imagenServer = new FileModel("", "");
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
