import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import { throwError} from 'rxjs';
import swal from 'sweetalert'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  

  loginUsuario(formulario: string) {
      let url = URL_SERVICIOS + '/login'
    return this.http.post(url, formulario)
      .pipe(map((resp: any) => {
      
        return true;
      }),
     catchError(err => {
        console.log(err.error.mensaje);
        swal('Error en el login!', err.error.mensaje, 'error');
        return throwError(err.message);
      }))
  }
  
}
