import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ModalService } from 'src/app/modal/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LineaService } from 'src/app/service/linea.service';


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
nombreLine;
desde: number =  0;
totalRegistro: number = 0;
categoriaLength: number = 0;

  constructor(private activate: ActivatedRoute,
    public serviceCategoria: CategoriaService,
    public serviceModal: ModalService,
    public serviceLinea: LineaService) { }

  ngOnInit(): void {
   
    this.activate.params.subscribe(
      params => {
        this.linea_id = params['id'];
       
       
      }
    );
    this. cargaCategoria();
    this.obtenerNombreLine();
  
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
 
      estado: new FormControl(true),


    });
  }
  obtenerNombreLine(){
    this.serviceLinea.lineaById(this.linea_id)
    .subscribe((resp: any)=>{
      this.nombreLine = resp['nombre'];
    });

  }

  cargaCategoria() {
    this.serviceCategoria.cargarCategoria(this.linea_id, this.desde)
      .subscribe((resp: any) => {
     
        this.categorias = resp;
        this.categoriaLength= this.categorias.length;
       
      
      });
      
  }

  paginacionDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.serviceCategoria.totalCategoria) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde = desde;
    this.cargaCategoria();
  }
  cerrarModal() {
    this.serviceModal.ocultarModal();
  }
  mostrarModal() {
    this.serviceModal.mostrarModal();
  }
  mostrarModalActulizar(categoria_id) {

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
      console.log("Actulizado!", "Categoria actulizada!", "success");
      this.cargaCategoria();
      this.cerrarModal();
      this.forma.reset();
    })
  }
  guardarCategoria() {
    this.serviceCategoria.guardarCategoriaNueva(this.forma.value, this.linea_id)
      .subscribe((resp) => {
        console.log("Guardada!", "Categoria guardada!", "success");
        this.cerrarModal();
        this.cargaCategoria();
        this.forma.reset();
      });
  }
  check(estado: any, Id){
    
    const  estadoActual = estado.currentTarget.checked;
    var request = {estado: estadoActual};
    this.serviceCategoria.estado(Id, request)
    .subscribe((resp)=>{
      console.log("Estado!", "Estado cambio!", "success");
     this.cargaCategoria();
    });
  }

  buscarCategoria(termino: string) {

    if (termino.trim() == "") {
      this.cargaCategoria();
      return;
    }
    this.serviceCategoria.buscaCategorias(termino, this.linea_id)
      .subscribe((categorias: any) => {
        this.categorias = categorias;
        this.categoriaLength = this.categorias.length;

      })

  }
  

}
