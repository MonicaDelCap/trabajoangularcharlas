import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";

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


}