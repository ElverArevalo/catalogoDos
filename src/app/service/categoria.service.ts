import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  totalCategoria: number = 0;
  categoriaPorPagina: number = 0;
  constructor(public http: HttpClient,
    public router: Router) { }

  cargarCategoria(lineaId: string, desde: number = 0) {
    let url = URL_SERVICIOS + '/categoria/' + lineaId + '?desde=' + desde;
   
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalCategoria = resp.total
        this.categoriaPorPagina = resp.length;
        return resp.categoria;
      }),
        catchError(err => {

          this.router.navigate(['/liena'])
          return throwError(err.message);
        }))
  }
  /// busca el nombre que pertence a la linea
  categoriaById(id: any,) {
    let url = URL_SERVICIOS + '/categoria/nombre/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        return resp.categoria;
      }));
  }
  actulizarCategoria(forma, id: any) {
    let url = URL_SERVICIOS + '/categoria/' + id;
    return this.http.put(url, forma)
      .pipe(map((resp: any) => {
        return resp.categoria;
      }));
  }
  guardarCategoriaNueva(formulario: any, idLinea: any) {
    let url = URL_SERVICIOS + '/categoria/' + idLinea;
    return this.http.post(url, formulario)
  }

  estado(id: any, estado: any) {
    let url = URL_SERVICIOS + '/categoria/estado/' + id;
    return this.http.put(url, estado)
      .pipe(map((resp: any) => {
        return resp.categoria;
      }));
  }
  buscaCategorias(termino: string, lineaId: any) {
    let url = URL_SERVICIOS + '/categoria/todo/' + termino + '/' + lineaId;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalCategoria = resp.total
        this.categoriaPorPagina = resp.length;
        return resp.categorias;
      }));

  }

}
