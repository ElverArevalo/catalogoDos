import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modal/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/service/producto.service';
import { SubirArchivosService } from 'src/app/service/subir-archivos.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-prodcuto',
  templateUrl: './prodcuto.component.html',
  styleUrls: ['./prodcuto.component.css']
})
export class ProdcutoComponent implements OnInit {
  productos = [];
  forma: FormGroup;
  imagenSubir: File;
  idProducto;
  categoria_id;
  nombre;
  
 

  constructor(public serviceProducto: ProductoService,
    public serviceModal: ModalService,
    public activate: ActivatedRoute,
    public serviceSubirArchivo: SubirArchivosService,
    public serviceCategoria: CategoriaService) { }


  ngOnInit(): void {
    this.nombreCategoria()
    this.activate.params.subscribe(
      params => {
        this.categoria_id = params['id'];
        console.log(this.categoria_id);
       
      }
    );
    this.nombreCategoria();
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
  nombreCategoria(){
    this.serviceCategoria.categoriaById(this.categoria_id)
    .subscribe((resp: any)=>{
      
      this.nombre = resp['nombre'];
    });
  }

  cerrarModal() {
    this.serviceModal.ocultarModal();
  }
  mostrarModal() {
    this.serviceModal.mostrarModal();
  }
  mostrarModalImg(id: string) {
   
    this.serviceModal.mostrarModalImagen('productos', id);
  }
  mostrarModalActulizar(producto_id) {
    console.log(producto_id._id)
    this.serviceModal.mostrarModal();
    this.forma.patchValue({
      nombre: producto_id.nombre,
      descripcion: producto_id.descripcion,
      credito: producto_id.credito,
      display: producto_id.display,
      unidad: producto_id.unidad,
      refinv: producto_id.refinv,

    });
   this.idProducto = producto_id._id;

  }

  actulizaProducto(){
    this.serviceProducto.atulizarproducto(this.forma.value, this.idProducto)
    .subscribe((resp) => {
      swal("Actulizado!", "Producto actulizada!", "success");
      this.cargaProducto();
      this.cerrarModal();
      this.forma.reset();
    })
  }
  guardarProducto() {
    console.log(this.forma.value);
    this.serviceProducto.guardarProductoNueva(this.forma.value, this.categoria_id)
      .subscribe((resp) => {
        swal("Guardado!", "Producto guardado!", "success");
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
      swal("Estado!", "Estado cambio!", "success");
      this.cargaProducto();
    });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      this.cerrarModal();
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
  

  }

  subirImagen() {
   
    this.serviceSubirArchivo.subirArchivo( this.imagenSubir, this.serviceModal.tipo, this.serviceModal.id)
    .then(resp => {
     this.cargaProducto();
      this.cerrarModal();
      

    })
    .catch(err => {
      swal('Solo Imagenes', 'Error a cargar la Imagen', 'error');
    });
    
  }



}
