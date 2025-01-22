import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";

@Injectable()
export class ServiceTeacher {

    getCourses(): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Profesor/AlumnosCursoProfesor";
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request, {headers:header})
            .then(r => resolve(r.data))
        })
    }

    updateCourse(id:number, booleano:boolean): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Cursos/UpdateEstadoCurso/" + id + "/" + booleano;
        return new Promise(function(resolve){
            axios.put(environment.urlCharlas + request, null,{headers:header})
            .then(r => resolve(r.data))
        })
    }

}