import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Login } from "../models/login";


@Injectable()
export class ServiceUser{
    register(name:string,surname:string,email:string,password:string):Observable<any>{
        let user = {
            idUsuario:1,
            nombre: name,
            apellidos: surname,
            email:email,
            estadoUsuario:true,
            imagen:"dsfs",
            password:password,
            idRole:2
        }
        let request = "api/usuarios";
        let url = environment.urlCharlas + request;
        return from(axios.post(url,user));
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