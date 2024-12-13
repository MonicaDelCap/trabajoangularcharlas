export class Round{
    constructor(
        public idRonda: number,
        public idCursoUsuario: number,
        public fechaPresentacion: string,
        public fechaCierre: string,
        public duracion: number,
        public descripcionModulo: string,
        public fechaLimiteVotacion: string
    ){}
}