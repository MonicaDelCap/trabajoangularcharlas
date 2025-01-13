export class Comentario {
    constructor(
        public idComentario: number,
        public idCharla: number,
        public idUsuario: number,
        public contenido: string,
        public fecha: Date
    ) {}
}