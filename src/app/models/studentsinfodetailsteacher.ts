import { Student } from "./student";
import { TalksByCourse } from "./talks";

export class StudentsInfoDetailsTeacher {
    constructor(
        public usuario: Student ,
        public charlasTotales:number,
        public charlasPropuestas:number,
        public charlasAceptadas:number,
        public charlas: Array<TalksByCourse>
    ){}
}