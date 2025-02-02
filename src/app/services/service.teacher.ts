import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Round } from "../models/round";
import { Course } from "../models/course";

@Injectable()
export class ServiceTeacherM {

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

    updateStatusStudent(id:number, status: boolean){
        let header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };        
        let request = "api/Profesor/UpdateEstadoAlumno/" + id + "/"+status;
        return new Promise(function(resolve){
            axios.put(environment.urlCharlas + request, null,{headers:header})
            .then(r => resolve(r.data))
        })
    }

    getStudentsCourseDisable(): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Profesor/AlumnosCursoHistorialProfesor";
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request, {headers:header})
            .then(r => resolve(r.data))
        })
    }

    getStudentByIdDisable(id:number): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Profesor/DatosAlumnoHistorial/" + id;
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request, {headers:header})
            .then(r => resolve(r.data))
        })
    }

    deleteCourse(id:number): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Cursos/" + id;
        return new Promise(function(resolve){
            axios.delete(environment.urlCharlas + request, {headers:header})
            .then(r => resolve(r.data))
        })
    }

    disableCourseWithAllStudents(id:number, state:boolean): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Usuarios/UpdateEstadoUsuariosCurso/" + id + "/" + state;
        return new Promise(function(resolve){
            axios.put(environment.urlCharlas + request,null, {headers:header})
            .then(r => resolve(r.data))
        })
    }

}