import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Login } from "../models/login";


@Injectable()
export class ServiceRound{

    getRounds(): Promise<any>{
        let request = "api/Rondas/RondasCurso";
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`}; 
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request, {headers: header}).then(r => resolve(r.data))
        })
    }
}