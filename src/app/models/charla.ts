export class Charla{
    constructor(
        public descripcion:string,
        public estadoCharla:string,
        public fechaPropuesta:Date,
        public idCharla:number,
        public idCurso:number,
        public idEstadoCharla:number,
        public idRonda:number,
        public idUsuario:number,
        public imagenCharla:string,
        public nombreCurso:string,
        public tiempo:number,
        public titulo:string,
        public usuario:string
    ){}
}