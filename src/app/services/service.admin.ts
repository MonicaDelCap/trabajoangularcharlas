import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";
import { User } from "../models/user";

@Injectable()
export class ServiceAdmin{
    
    getUsuarios():Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Usuarios";
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data));
        })
    }

    updateEstadoAlumno(id:number, estado:boolean):Promise<any> {
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Usuarios/UpdateEstadoUsuario/" + id + "/" + estado;
        return new Promise(function(resolve, reject) {
            axios.put(environment.urlCharlas + request, {}, {headers: header})
            .then(r => resolve(r.data))
            .catch(error => reject(error));
        });
    }

    deleteUsuario(id:number):Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Usuarios/" + id ;
        return new Promise(function(resolve){
            axios.delete(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data))
        })
    }

    updateUsuario(user:User):Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Usuarios";
        return new Promise(function(resolve){
            axios.put(environment.urlCharlas + request,user,{headers:header})
            .then(r => resolve(r.data));
        })
    }


}