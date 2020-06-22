import { Injectable, EventEmitter } from '@angular/core';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
   
    public oculto: string = 'oculto';
    public notificacion$ = new EventEmitter<any>();
    public tipo: string;
    public id: string;

  constructor() {
   
  }

  ocultarModal() {
    this.notificacion$.emit(true);
    $('#exampleModal').modal('hide');
    $('#exampleModalActulizar').modal('hide');
    $('#exampleModalImagen').modal('hide');
  
  }
   mostrarModal() {
 
    this.oculto = '';
  
  }

  mostrarModalImagen( tipo: string, id: string) {
    this.oculto = '';
    this.id= id;
    this.tipo = tipo;
  
  }
  tootlop() {
    $('#example').tooltip({ boundary: 'window' })
  }
}
