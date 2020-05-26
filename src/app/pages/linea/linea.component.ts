import { Component, OnInit } from '@angular/core';
import { LineaService } from 'src/app/service/linea.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/modal/modal.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})


export class LineaComponent implements OnInit {
  lineas = [];
  forma: FormGroup;
  idLinea;
  
  subscription = new Subscription();

  constructor(public serviceLinea: LineaService,
    public serviceModal: ModalService,
    private router: Router) { }


  ngOnInit(): void {
    this.cargaLinea();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      img: new FormControl(null),
      estado: new FormControl(true),


    });
  }

  cerrarModal() {
    this.serviceModal.ocultarModal();
  }
  mostrarModal() {
    this.serviceModal.mostrarModal();
  }
  mostrarModalActulizar(linea_id) {
    console.log(linea_id._id)
    this.serviceModal.mostrarModal();
    this.forma.patchValue({
      nombre: linea_id.nombre,
      descripcion: linea_id.descripcion
    });
   this.idLinea = linea_id._id;

  }

  actulizaLinea(){
    this.serviceLinea.atulizarLinea(this.forma.value, this.idLinea)
    .subscribe((resp) => {
      this.cargaLinea();
      this.cerrarModal();
      this.forma.reset();
    })
  }
  guardarLinea() {
    this.serviceLinea.guardarLineaNueva(this.forma.value)
      .subscribe((resp) => {
        this.cerrarModal();
        this.cargaLinea();
        this.forma.reset();
      });
  }
    cargaLinea() {
    this.serviceLinea.cargarLinea()
      .subscribe((resp: any) => {
        this.lineas = resp;
      });
      
  }


  check(estado: any, Id){
    console.log(estado.currentTarget.checked);
    console.log(Id);
    const  estadoActual = estado.currentTarget.checked;
    var request = {estado: estadoActual};
    this.serviceLinea.estado(Id, request)
    .subscribe((resp)=>{
      console.log("Respuesta correcta");
      this.cargaLinea();
    });
  }


}
