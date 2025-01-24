import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Round } from "../models/round";
import { Course } from "../models/course";

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
    updateDateCourse(course:Course): Promise<any>{
        let header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };        let request = "api/Cursos";
        return new Promise(function(resolve){
            axios.put(environment.urlCharlas + request, JSON.stringify(course),{headers:header})
            .then(r => resolve(r.data))
        })
    }

    createCourse(course:Course): Promise<any>{
        let header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };        let request = "api/Profesor/CreateCurso";
        return new Promise(function(resolve){
            axios.post(environment.urlCharlas + request, JSON.stringify(course),{headers:header})
            .then(r => resolve(r.data))
        })
    }

    getStudentById(id:number): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Profesor/DatosAlumno/" + id;
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request, {headers:header})
            .then(r => resolve(r.data))
        })
    }

}