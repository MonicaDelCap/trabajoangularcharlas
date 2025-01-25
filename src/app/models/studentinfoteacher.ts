import { Student } from "./student";
import { TalksByCourse } from "./talks";

export class StudentsInfoTeacher {
    constructor(
        public alumno: Student ,
        public charlasTotales:number,
        public charlasPropuestas:number,
        public charlasAceptadas:number,
        public charlas: Array<TalksByCourse>
    ){}
}