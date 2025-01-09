import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Login } from "../models/login";
import { Register } from "../models/register";


@Injectable()
export class ServiceUser{
    register(register:Register, courseCode:string):Promise<any>{
        let request = "api/Usuarios/NewAlumno/" + courseCode;
        let json = JSON.stringify(register);
        return new Promise(function(resolve){
            axios.post(environment.urlCharlas + request,json)
            .then( r => resolve(r.data))
            .catch( r => resolve(r.data))
        })
        
    }
    getToken(login:Login): Promise<any>{
        let json = JSON.stringify(login);
        let header = {"Content-Type": "application/json"};
        let request = "api/Auth/Login";
        return new Promise(function(resolve){
            axios.post(environment.urlCharlas + request,json,{headers: header})
            .then( r => resolve(r.data))
            .catch( r => resolve(r.data))
        })
    }

    getProfile(): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Usuarios/Perfil";
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header}).then( r => resolve(r.data))
        })
    }
}