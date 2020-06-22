import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modal/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/service/producto.service';
import { SubirArchivosService } from 'src/app/service/subir-archivos.service';
import { CategoriaService } from 'src/app/service/categoria.service';

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
  nombreCategoria: any;
  desde: number = 0;
  totalRegistro: number = 0;
  productoLength: number = 0;


  constructor(public serviceProducto: ProductoService,
    public serviceModal: ModalService,
    public activate: ActivatedRoute,
    public serviceSubirArchivo: SubirArchivosService,
    public serviceCategoria: CategoriaService) { }


  ngOnInit(): void {

    this.activate.params.subscribe(
      params => {
        this.categoria_id = params['id'];


      }
    );
    this.cargaProducto();
    this.obtnerNombreCategoria();

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
  obtnerNombreCategoria() {
    this.serviceCategoria.categoriaById(this.categoria_id)
      .subscribe((resp: any) => {

        this.nombreCategoria = resp['nombre'];
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

  actulizaProducto() {
    this.serviceProducto.atulizarproducto(this.forma.value, this.idProducto)
      .subscribe((resp) => {
        console.log("Actulizado!", "Producto actulizada!", "success");
        this.cargaProducto();
        this.cerrarModal();
        this.forma.reset();
      })
  }
  guardarProducto() {

    this.serviceProducto.guardarProductoNueva(this.forma.value, this.categoria_id)
      .subscribe((resp) => {
        console.log("Guardado!", "Producto guardado!", "success");
        this.cerrarModal();
        this.cargaProducto();
        this.forma.reset();

      });
  }
  cargaProducto() {
    this.serviceProducto.cargarproducto(this.categoria_id, this.desde)
      .subscribe((resp: any) => {
        this.productos = resp;
        this.productoLength = this.productos.length;
      });

  }

  paginacionDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.serviceProducto.totalProducto) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde = desde;
    this.cargaProducto();
  }


  check(estado: any, Id) {

    const estadoActual = estado.currentTarget.checked;
    var request = { estado: estadoActual };
    this.serviceProducto.estado(Id, request)
      .subscribe((resp) => {
        console.log("Estado!", "Estado cambio!", "success");
        this.cargaProducto();
      });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      console.log('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      this.cerrarModal();
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);


  }

  subirImagen() {

    this.serviceSubirArchivo.subirArchivo(this.imagenSubir, this.serviceModal.tipo, this.serviceModal.id)
      .then(resp => {
        this.cargaProducto();
        this.cerrarModal();

      })
      .catch(err => {
        console.log('Solo Imagenes', 'Error a cargar la Imagen', 'error');
      });

  }

  buscarProductos(termino: string) {

    if (termino.trim() == "") {
      this.cargaProducto();
      return;
    }
    this.serviceProducto.buscaProductos(termino, this.categoria_id)
      .subscribe((productos: any) => {
        this.productos = productos;
        this.productoLength = this.productos.length;

      })

  }
}
