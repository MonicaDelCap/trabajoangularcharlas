import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import axios from "axios";

@Injectable()
export class ServiceTeacher{
    
    getCursos():Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/profesor/cursosProfesor"
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data))
        })
    }

    getRondas():Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/profesor/rondasprofesor"
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data))
        })
    }

    getAlumnos():Promise<any>{
        let header = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/profesor/alumnoscursoprofesor"
        return new Promise(function(resolve){
            axios.get(environment.urlCharlas + request,{headers:header})
            .then(r => resolve(r.data))
        })
    }
    getCharlasRonda(idRonda: number): Promise<any> {
        let header = { "Authorization": `Bearer ${localStorage.getItem('authToken')}` };
        let request = `api/Charlas/CharlasRonda/${idRonda}`;
        return new Promise(function(resolve) {
            axios.get(environment.urlCharlas + request, { headers: header })
                .then(r => resolve(r.data))
                .catch(error => {
                    console.error("Error fetching charlas for ronda:", error);
                    resolve([]);
                });
        });
    }
    getVotosCharla(idCharla: number): Promise<any> {
        let header = { "Authorization": `Bearer ${localStorage.getItem('authToken')}` };
        let request = `api/Votos/VotosCharla/${idCharla}`;
        return new Promise(function(resolve) {
            axios.get(environment.urlCharlas + request, { headers: header })
                .then(r => resolve(r.data))
                .catch(error => {
                    console.error("Error fetching votes for charla:", error);
                    resolve([]);
                });
        });
    }
    updateCharla(charlaData: any): Promise<any> {
        let header = { "Authorization": `Bearer ${localStorage.getItem('authToken')}` };
        let request = `api/Charlas`;
        
        return new Promise(function(resolve, reject) {
            axios.put(environment.urlCharlas + request, charlaData, { headers: header })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.error("Error updating charla:", error);
                    reject(error);
                });
        });
    }
}