import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LineaService {
  totalLinea: number = 0;
  userToken: any;

  constructor(public http: HttpClient,
    public serviceLogin: LoginService,
    public router: Router) { }


    cargarLinea(desde: number = 0) {
      let url = URL_SERVICIOS + '/linea?desde=' + desde
    
      return this.http.get(url)
        .pipe(map((resp: any) => {
          this.totalLinea = resp.total
          return resp.linea;
        }));
  
    }
    lineaById(id:any){
      let url = URL_SERVICIOS + '/linea/'+ id;
      return this.http.get(url)
        .pipe(map((resp: any) => {
           return resp.linea;
        }));
    }
    atulizarLinea(forma, id:any) {
       
        let url = URL_SERVICIOS + '/linea/' + id;
        return this.http.put(url, forma, id)
          .pipe(map((resp: any) => {
             return resp.linea;
          }));
    }
    guardarLineaNueva(formulario:any) {
      let url = URL_SERVICIOS + '/linea';
      url += '?token=' + this.serviceLogin.userToken;
      return this.http.post(url, formulario)
     }

    estado(id:any, estado: any){
      let url = URL_SERVICIOS + '/linea/estado/' + id;
      return this.http.put(url, estado )
        .pipe(map((resp: any) => {
           return resp.categoria;
        }));
    }
}
