import { Course } from "./course";
import { Student } from "./student";
import { StudentsInfoTeacher } from "./studentinfoteacher";

export class StudentsCoursesTeacher {
    constructor(
        public numeroAlumnos: number,
        public curso: Course,
        public alumnos: Array<StudentsInfoTeacher>
    )
    {}
}