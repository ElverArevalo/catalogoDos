import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ModalService } from 'src/app/modal/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
forma: FormGroup;
linea_id: any;
categorias: any[];
idCategoria;
  constructor(private activate: ActivatedRoute,
    public serviceCategoria: CategoriaService,
    public serviceModal: ModalService) { }

  ngOnInit(): void {
    this.activate.params.subscribe(
      params => {
        this.linea_id = params['id'];
        console.log(this.linea_id);
       
      }
    );
    this. cargaCategoria();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
 
      estado: new FormControl(true),


    });
  }

  cargaCategoria() {
    this.serviceCategoria.cargarCategoria(this.linea_id)
      .subscribe((resp: any) => {
        this.categorias = resp;
        console.log(this.categorias);
      });
      
  }
  cerrarModal() {
    this.serviceModal.ocultarModal();
  }
  mostrarModal() {
    this.serviceModal.mostrarModal();
  }
  mostrarModalActulizar(categoria_id) {
    console.log(categoria_id._id)
    this.serviceModal.mostrarModal();
    this.forma.patchValue({
      nombre: categoria_id.nombre,
      descripcion: categoria_id.descripcion
    });
   this.idCategoria = categoria_id._id;

  }

  actulizaCategoria(){
    this.serviceCategoria.actulizarCategoria(this.forma.value, this.idCategoria)
    .subscribe((resp) => {
      this.cargaCategoria();
      this.cerrarModal();
      this.forma.reset();
    })
  }
  guardarCategoria() {
    this.serviceCategoria.guardarCategoriaNueva(this.forma.value, this.linea_id)
      .subscribe((resp) => {
        this.cerrarModal();
        this.cargaCategoria();
        this.forma.reset();
      });
  }
  check(estado: any, Id){
    console.log(estado.currentTarget.checked);
    console.log(Id);
    const  estadoActual = estado.currentTarget.checked;
    var request = {estado: estadoActual};
    this.serviceCategoria.estado(Id, request)
    .subscribe((resp)=>{
     this.cargaCategoria();
    });
  }
  

}
