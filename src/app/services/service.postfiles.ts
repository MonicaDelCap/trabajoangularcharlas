import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileModel } from "../models/filemodel";
import { environment } from "../../environments/environment";

@Injectable()
export class ServicePostFiles {

    //PARA LAS PETICIONES API VIENE UN OBJETO LLAMADO 
    //HttpClient QUE NOS PERMITIRA REALIZAR LAS PETICIONES
    constructor(private _http: HttpClient) {}

    //VOY A RECIBIR DIRECTAMENTE EL OBJETO EN EL METODO DE INSERTAR
    postFileUser(fileModel: FileModel, id: number): Observable<any> {
        // Convertir objeto a JSON
        let json = JSON.stringify(fileModel);
    
        // Obtener el token (ejemplo usando localStorage)
        const token = localStorage.getItem('authToken');
    
        // Configurar las cabeceras
        let headers = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
    
        // Construir la URL
        const request = "api/files/uploadimagenusuario/" + id;
        const url = environment.urlCharlas + request;
    
        // Realizar la petición POST
        return this._http.post(url, json, { headers: headers });
    }
    

    postFileCharla(fileModel: FileModel,id:number): Observable<any>{
        //ESTO ES COMO JQUERY CONVERTIR UN OBJETO A JSON
        let json = JSON.stringify(fileModel);
        //DEBEMOS INDICAR EN LA PETICION QUE TIPO DE FORMATO TIENE EL OBJETO A ENVIAR
        let header = new HttpHeaders();
        header = header.set("Content-type", "application/json");
        let request = "api/files/uploadimagencharla/" + id;
        let url = environment.urlCharlas + request;
        return this._http.post(url, json, {headers: header});
    }

}