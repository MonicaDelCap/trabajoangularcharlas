import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable()
export class ServiceAdmin {

    constructor(private _htpp: HttpClient) {

    }

    getUsuariosActivos(): Observable<any> {
        let request = 'api/admin/usuariosactivos';
        let url = environment.urlCharlas2 + request;

        //const token = localStorage.getItem('authToken');
        const token = localStorage.getItem('authToken');
        // Configurar las cabeceras
        let header = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        return this._htpp.get(url, { headers: header });
    }

    getProfesores(): Observable<any> {
        let request = 'api/admin/profesores';
        let url = environment.urlCharlas2 + request;
        const token = localStorage.getItem('authToken');
        let header = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        return this._htpp.get(url, { headers: header });
    }

    updateRolUsuario(idUser: number, newRole: number): Observable<any> {
        let request = 'api/admin/updaterolusuario/';
        let url = environment.urlCharlas2 + request + idUser + '/' + newRole;
        console.log(url);
        const token = localStorage.getItem('authToken');
        let header = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        return this._htpp.put(url, { headers: header });
    }

    updateEstadoProfesor(idUsuario: number, estado: boolean): Observable<any> {
        let request = "api/admin/updateEstadoProfesor/";
        let url = environment.urlCharlas2 + request + idUsuario + '/' + estado;
        console.log(url);
        const token = localStorage.getItem('authToken');
        let header = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        return this._htpp.put(url, { headers: header });
    }

    updateCursoUsuario(idUsuario: number, idCurso: number): Observable<any> {
        let request = "api/admin/updateCursoUsuario/";
        let url = environment.urlCharlas2 + request + idUsuario + '/' + idCurso;
        console.log(url);
        const token = localStorage.getItem('authToken');
        let header = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        return this._htpp.put(url, { headers: header });
    }
    
    buscarUsuario(idUsuario:number):Observable<any>{
        let request="api/usuarios/"+idUsuario;
        let url=environment.urlCharlas2+request;
        const token = localStorage.getItem('authToken');
        let header=new HttpHeaders()
            .set("Content-Type","application/json")
            .set("Authorization",`Bearer ${token}`);
        return this._htpp.get(url,{headers:header});
    }

    getCursos():Observable<any>{
        let request="api/Cursos";
        let url=environment.urlCharlas2+request;
        const token = localStorage.getItem('authToken');
        let header=new HttpHeaders()
            .set("Content-Type","application/json")
            .set("Authorization",`Bearer ${token}`);
        return this._htpp.get(url,{headers:header});
    }

    getUsuariosCurso(idCurso:number):Observable<any>{
        let request="api/usuarios/usuarioscurso/"+idCurso;
        let url=environment.urlCharlas2+request;
        const token = localStorage.getItem('authToken');
        let header=new HttpHeaders()
            .set("Content-Type","application/json")
            .set("Authorization",`Bearer ${token}`);
        return this._htpp.get(url,{headers:header});
    }

}