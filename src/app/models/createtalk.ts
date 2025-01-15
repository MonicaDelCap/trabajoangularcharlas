export class Talk{
    constructor(
        public idCharla: number,
        public titulo: string,
        public descripcion: string,
        public tiempo: number,
        public fechaPropuesta: string,
        public idUsuario: number,
        public idEstadoCharla: number,
        public idRonda: number,
        public imagenCharla: string
    ){}
}