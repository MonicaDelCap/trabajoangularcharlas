import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import axios from "axios";
import { environment } from "../../environments/environment";
import { Login } from "../models/login";
import { User } from "../models/user";
import { Charla } from "../models/charla";
import { Comentario } from "../models/comentario";


@Injectable()
export class ServiceUser {
    register(user: User, courseCode: string): Promise<any> {
        let request = "api/Usuarios/NewAlumno/" + courseCode;
        let header = { "Content-Type": "application/json" };
        let json = JSON.stringify(user);
        console.log(json);
        return new Promise(function (resolve, reject) {
            axios.post(environment.urlCharlas2 + request, json, { headers: header })
                .then(r => resolve(r.data))
                .catch(r => reject(r.code))
        })

    }
    getToken(login: Login): Promise<any> {
        let json = JSON.stringify(login);
        let header = { "Content-Type": "application/json" };
        let request = "api/Auth/Login";
        return new Promise(function (resolve, reject) {
            axios.post(environment.urlCharlas + request, json, { headers: header })
                .then(r => resolve(r.data))
                .catch(r => reject(r.code))
        })
    }

    getProfile(): Promise<any> {
        let header = { "Authorization": `Bearer ${localStorage.getItem('authToken')}` };
        let request = "api/Usuarios/Perfil";
        return new Promise(function (resolve) {
            axios.get(environment.urlCharlas + request, { headers: header }).then(r => resolve(r.data))
        })
    }

    updateUser(user: User): Observable<any> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        };
        const request = "api/usuarios";
        const url = environment.urlCharlas + request;
        return from(axios.put(url, user, { headers: headers }));
    }

    getCharlasCurso(): Promise<Charla[]> {
        const request = `api/Charlas/CharlasCurso`;
        const header = { "Authorization": `Bearer ${localStorage.getItem('authToken')}` };
        return new Promise((resolve, reject) => {
            axios.get(environment.urlCharlas + request, { headers: header })
                .then(response => {
                    const charlas: Charla[] = response.data.map((charlaData: any) => new Charla(
                        charlaData.descripcion,
                        charlaData.estadoCharla,
                        new Date(charlaData.fechaPropuesta),
                        charlaData.idCharla,
                        charlaData.idCurso,
                        charlaData.idEstadoCharla,
                        charlaData.idRonda,
                        charlaData.idUsuario,
                        charlaData.imagenCharla,
                        charlaData.nombreCurso,
                        charlaData.tiempo,
                        charlaData.titulo,
                        charlaData.usuario
                    ));
                    resolve(charlas);
                })
                .catch(error => reject(error));
        });
    }
    getCharlaById(id: string): Promise<Charla> {
        const request = `api/Charlas/${id}`;
        const header = { "Authorization": `Bearer ${localStorage.getItem('authToken')}` };

        return new Promise((resolve, reject) => {
            axios.get(environment.urlCharlas + request, { headers: header })
                .then(response => {
                    const charlaData = response.data.charla;
                    const comentariosData = response.data.comentarios;
                    const comentarios = comentariosData.map((comentario: any) => new Comentario(
                        comentario.idComentario,
                        comentario.idCharla,
                        comentario.idUsuario,
                        comentario.usuario,
                        comentario.contenido,
                        new Date(comentario.fecha)
                    ));
                    const charla = new Charla(
                        charlaData.descripcion || "",
                        "", // Estado no incluido en el API
                        new Date(charlaData.fechaPropuesta || ""),
                        charlaData.idCharla || 0,
                        0, // Curso no incluido en el API
                        charlaData.idEstadoCharla || 0,
                        charlaData.idRonda || 0,
                        charlaData.idUsuario || 0,
                        charlaData.imagenCharla || "",
                        "", // Nombre del curso no incluido en el API
                        charlaData.tiempo || 0,
                        charlaData.titulo || "",
                        "", // Usuario no incluido en el API
                        comentarios // Array de comentarios
                    );
                    resolve(charla);
                })
                .catch(error => reject(error));
        });
    }
    addComentario(idCharla: number, idUsuario: number, usuario: string, contenido: string): Promise<void> {
        const request = `api/Comentarios`;
        const header = { "Authorization": `Bearer ${localStorage.getItem('authToken')}` };

        const comentario = {
            idComentario: 0,  // El ID se generará automáticamente en el servidor
            idCharla: idCharla,
            idUsuario: idUsuario,
            usuario: usuario,
            contenido: contenido,
            fecha: new Date().toISOString()
        };

        return axios.post(environment.urlCharlas + request, comentario, { headers: header })
            .then(() => console.log('Comentario agregado con éxito'))
            .catch(error => {
                console.error('Error al agregar comentario:', error);
                throw error;
            });
    }

    updateCharla(charla: Partial<Charla>): Promise<void> {
        const request = `api/Charlas`;
        const header = { Authorization: `Bearer ${localStorage.getItem('authToken')}` };

        return axios.put(environment.urlCharlas + request, charla, { headers: header })
            .then(() => console.log('Charla actualizada con éxito'))
            .catch(error => {
                console.error('Error al actualizar charla:', error);
                throw error;
            });
    }
}