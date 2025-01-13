import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Login } from "../models/login";
import { User } from "../models/user";


@Injectable()
export class ServiceUser{
    register(user:User, courseCode:string):Promise<any>{
        let request = "api/Usuarios/NewAlumno/" + courseCode;
        let header = {"Content-Type": "application/json"};
        let json = JSON.stringify(user);
        console.log(json);
        return new Promise(function(resolve,reject){
            axios.post(environment.urlCharlas2 + request,json,{headers:header})
            .then( r => resolve(r.data))
            .catch( r => reject(r.code))
        })
        
    }
    getToken(login:Login): Promise<any>{
        let json = JSON.stringify(login);
        let header = {"Content-Type": "application/json"};
        let request = "api/Auth/Login";
        return new Promise(function(resolve,reject){
            axios.post(environment.urlCharlas + request,json,{headers: header})
            .then( r => resolve(r.data))
            .catch( r => reject(r.code))
        })
    }

    getProfile(): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Usuarios/Perfil";
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header}).then( r => resolve(r.data))
        })
    }

    updateUser(user: User): Observable<any> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };
        const request = "api/usuarios";
        const url = environment.urlCharlas + request;
        return from(axios.put(url, user, { headers: headers }));
    }
    
}