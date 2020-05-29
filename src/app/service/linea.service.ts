import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LineaService {

  

  constructor(public http: HttpClient,
    public router: Router) { }


    cargarLinea() {
      let url = URL_SERVICIOS + '/linea';
      return this.http.get(url)
        .pipe(map((resp: any) => {
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
        console.log(id);
        let url = URL_SERVICIOS + '/linea/' + id;
        return this.http.put(url, forma, id)
          .pipe(map((resp: any) => {
             return resp.linea;
          }));
    }
    guardarLineaNueva(formulario:any) {
      let url = URL_SERVICIOS + '/linea';
     
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
