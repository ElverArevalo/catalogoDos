import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modal/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-prodcuto',
  templateUrl: './prodcuto.component.html',
  styleUrls: ['./prodcuto.component.css']
})
export class ProdcutoComponent implements OnInit {
  productos = [];
  forma: FormGroup;
  idProducto;
  categoria_id;
  
 

  constructor(public serviceProducto: ProductoService,
    public serviceModal: ModalService,
    public activate: ActivatedRoute) { }


  ngOnInit(): void {

    this.activate.params.subscribe(
      params => {
        this.categoria_id = params['id'];
        console.log(this.categoria_id);
       
      }
    );

    this.cargaProducto();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      refinv: new FormControl(null, Validators.required),
      credito: new FormControl(null, Validators.required),
      display: new FormControl(null, Validators.required),
      unidad: new FormControl(null, Validators.required),
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
  mostrarModalActulizar(producto_id) {
    console.log(producto_id._id)
    this.serviceModal.mostrarModal();
    this.forma.patchValue({
      nombre: producto_id.nombre,
      descripcion: producto_id.descripcion
    });
   this.idProducto = producto_id._id;

  }

  actulizaProducto(){
    this.serviceProducto.atulizarproducto(this.forma.value, this.idProducto)
    .subscribe((resp) => {
      this.cargaProducto();
      this.cerrarModal();
      this.forma.reset();
    })
  }
  guardarProducto() {
    console.log(this.forma.value);
    this.serviceProducto.guardarProductoNueva(this.forma.value, this.categoria_id)
      .subscribe((resp) => {
        this.cerrarModal();
        this.cargaProducto();
        this.forma.reset();
      
      });
  }
    cargaProducto() {
    this.serviceProducto.cargarproducto(this.categoria_id)
      .subscribe((resp: any) => {
        this.productos = resp;
        console.log(this.productos);
      });
      
  }


  check(estado: any, Id){
    console.log(estado.currentTarget.checked);
    console.log(Id);
    const  estadoActual = estado.currentTarget.checked;
    var request = {estado: estadoActual};
    this.serviceProducto.estado(Id, request)
    .subscribe((resp)=>{
      console.log("Respuesta correcta");
      this.cargaProducto();
    });
  }


}
