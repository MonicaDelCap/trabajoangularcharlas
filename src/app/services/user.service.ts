import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import axios from "axios";
import { environment } from "../../environments/environment";


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
}