import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Observable, from } from "rxjs";

@Injectable()
export class ServiceCharla{
    getCharlaAlumno():Observable<any>{
        let headers = {"Authorization": `Bearer ${localStorage.getItem('authToken')}`};
        let request = "api/charlas/charlasalumno";
        return from(axios.get(environment.urlCharlas + request,{headers}));
    }
}