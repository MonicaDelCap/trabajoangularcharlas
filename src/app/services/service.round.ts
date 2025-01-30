import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Login } from "../models/login";
import { Round } from "../models/round";


@Injectable()
export class ServiceRound{

    getRounds(): Promise<any>{
        let request = "api/Rondas/RondasCurso";
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`}; 
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request, {headers: header}).then(r => resolve(r.data))
        })
    }

    getRoundById(id:number) :Promise<any>{
        let request = "api/Rondas/" + id;
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`}; 
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header}).then(r => resolve(r.data))
        })
    }

    updateRoundById(round:Round):Promise<any>{
        let request = "api/Profesor/UpdateRonda";
        let header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };        
        return new Promise(function(resolve, reject){
            axios.put(environment.urlCharlas + request,JSON.stringify(round),{headers:header})
            .then(r => resolve(r.data))
            .catch(r => reject(r))
        })
    }

    deleteRoundById(id:number){
        let request = "api/Profesor/DeleteRonda/" + id;
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`}; 
        return new Promise(function(resolve,reject){
            axios.delete(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data))
        })
    }

    createRoundById(round:Round):Promise<any>{
        let request = "api/Profesor/CreateRonda";
        let header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };        
        return new Promise(function(resolve, reject){
            axios.post(environment.urlCharlas + request,JSON.stringify(round),{headers:header})
            .then(r => resolve(r.data))
            .catch(r => reject(r))
        })
    }
}