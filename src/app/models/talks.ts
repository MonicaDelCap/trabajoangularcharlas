export class Talks{
    constructor(
        public idCharla: number,
        public titulo: string,
        public descripcion: string,
        public tiempo: number,
        public fechaPropuesta: string,
        public imagenCharla: string,
        public idUsuario: number,
        public usuario: string,
        public idEstadoCharla: number,
        public estadoCharla: string,
        public idRonda: number,
        public idCurso: number,
        public nombreCurso: string
    ){}
}