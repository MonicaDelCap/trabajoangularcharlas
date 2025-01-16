export class Comentario {
    constructor(
        public idComentario: number,
        public idCharla: number,
        public idUsuario: number,
        public usuario: string,
        public contenido: string,
        public fecha: Date
    ) {}
}