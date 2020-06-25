import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { throwError} from 'rxjs';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuario: any;
  token: string;
  
  userToken: any;
  public decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
 
  constructor(public http: HttpClient,
    private iniciadoSecion: JwtHelperService,
    public router: Router) {
      this.sesionIniciada()
     }

  guardarStorage( token: string) {
   
    localStorage.setItem('token', token);
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.userToken = token;
   
  }

  loginUsuario(formulario: string) {
      let url = URL_SERVICIOS + '/login'
    return this.http.post(url, formulario)
      .pipe(map((resp: any) => {
        this.usuario = resp.usuario.nombre;
        this.guardarStorage(resp.token)
        return true;
      }),
     catchError(err => {
       
       console.log('Error en el login!', err.error.mensaje, 'error');
        return throwError(err.message);
      }))
  }


  logout() {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  }

  sesionIniciada() {
    return this.iniciadoSecion.isTokenExpired();
  }
  
}
