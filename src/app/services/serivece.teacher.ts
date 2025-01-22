import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import axios from "axios";

@Injectable()
export class ServiceTeacher{
    
    getCursos():Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/profesor/cursosProfesor"
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data))
        })
    }

    getRondas():Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/profesor/rondasprofesor"
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data))
        })
    }

    getAlumnos():Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/profesor/alumnoscursoprofesor"
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data))
        })
    }
}