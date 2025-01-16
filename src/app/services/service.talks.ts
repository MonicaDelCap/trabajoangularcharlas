import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";
import { from, Observable } from "rxjs";
import { Talk } from "../models/createtalk";
import { Resource } from "../models/resource";
import { FileModel } from "../models/filemodel";

@Injectable()
export class ServiceTalks{

    getTalks(idRonda: number): Promise<any>{
        let request = "api/Charlas/CharlasRonda/" + idRonda;
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        return new Promise (function(resolve){
            axios.get(environment.urlCharlas + request, {headers: header}).then(r => resolve(r.data)); 
        })
    }

    getTalkById(idTalk:number): Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/Charlas/" + idTalk;
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request, {headers: header}).then ( r => resolve(r.data))
        })
    }

    getCharlaAlumno():Observable<any>{
        let headers = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/charlas/charlasalumno";
        return from(axios.get(environment.urlCharlas + request,{headers}));
    }

    createTalk(newTalk:Talk):Promise<any>{
        let header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };
        let request = "api/Charlas";
        let json = JSON.stringify(newTalk);

        return new Promise(function(resolve,reject){
            axios.post(environment.urlCharlas2 + request, json,{headers:header})
            .then(r => resolve(r.data)).catch(r => reject(r))

        })
    }

    createResourceForTalk(newResource:Resource):Promise<any>{
        let header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };
        let request = "api/Recursos";
        let json = JSON.stringify(newResource);

        return new Promise(function(resolve,reject){
            axios.post(environment.urlCharlas + request, json,{headers:header}).then(r =>{
                resolve(r.data)
            }).catch(r => reject(r))

        })

    }

    createPostFileTalk(fileModel: FileModel, id: number): Promise<any> {
        console.log(JSON.stringify(fileModel))
        let header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };
        let request = 'api/Files/UploadImagenCharla/' + id;
        return new Promise(function(resolve,reject){ 
            axios.post(environment.urlCharlas + request, JSON.stringify(fileModel),{ headers:header })
            .then(r => resolve(r.data))
            .catch(r => reject(r));
        })
    }
      


}