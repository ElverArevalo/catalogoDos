import { Injectable, EventEmitter } from '@angular/core';
import { LineaService } from '../service/linea.service';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
   
    public oculto: string = 'oculto';
    public notificacion$ = new EventEmitter<any>();

  constructor() {
   
  }

  ocultarModal() {
    this.notificacion$.emit(true);
    $('#exampleModal').modal('hide');
    $('#exampleModalActulizar').modal('hide');
  
  }
   mostrarModal() {
 
    this.oculto = '';

  }
  tootlop() {
    $('#example').tooltip({ boundary: 'window' })
  }
}
