import { Injectable } from "@angular/core";
import { Login } from "../models/login";
import axios from "axios";
import { environment } from "../../environments/environment.development";
@Injectable()
export class UserService{

    getToken(login:Login): Promise<any>{
        let json = JSON.stringify(login);
        let header = {"Content-Type": "application/json"};
        let request = "api/Auth/Login";
        return new Promise(function(resolve){
            axios.post(environment.urlCharlas + request,json,{headers: header})
            .then( r => resolve(r.data))
            .catch( r => resolve(r.data))
        })
    }

}