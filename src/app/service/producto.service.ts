import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  totalProducto: number = 0;
  productoPorPagina: number = 0;
  constructor(public http: HttpClient,
    public router: Router) { }


    cargarproducto(categoiraId:string, desde: number = 0) {
      let url = URL_SERVICIOS  + '/producto/'+ categoiraId + '?desde=' + desde;
    
      return this.http.get(url)
        .pipe(map((resp: any) => {
          this.totalProducto = resp.total
         
          this.productoPorPagina = resp.length;
          return resp.producto;
        }));
  
    }
    atulizarproducto(forma, id:any) {
   
        let url = URL_SERVICIOS + '/producto/' + id;
        return this.http.put(url, forma, id)
          .pipe(map((resp: any) => {
             return resp.producto;
          }));
    }
    guardarProductoNueva(formulario:any, idCategoria: any) {
      let url = URL_SERVICIOS + '/producto/' + idCategoria;
     
      return this.http.post(url, formulario)
  
    
    }

    estado(id:any, estado: any){
      let url = URL_SERVICIOS + '/producto/estado/' + id;
      return this.http.put(url, estado )
        .pipe(map((resp: any) => {
           return resp.categoria;
        }));
    }
}