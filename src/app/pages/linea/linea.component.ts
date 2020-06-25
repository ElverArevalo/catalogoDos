import { Component, OnInit } from '@angular/core';
import { LineaService } from 'src/app/service/linea.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'src/app/modal/modal.service';


import { SubirArchivosService } from 'src/app/service/subir-archivos.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})


export class LineaComponent implements OnInit {
  lineas = [];
  forma: FormGroup;
  imagenSubir: File;
  idLinea;
  desde: number =  0;
  totalRegistro: number = 0;
  

  constructor(public serviceLinea: LineaService,
  
    public serviceModal: ModalService,
    public serviceSubirArchivo: SubirArchivosService) { }

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
  mostrarModalImg(id: string) {
    this.serviceModal.mostrarModalImagen('lineas', id);
  }
  mostrarModalActulizar(linea_id) {
  
    this.serviceModal.mostrarModal();
    this.forma.patchValue({
      nombre: linea_id.nombre,
      descripcion: linea_id.descripcion
    });
    this.idLinea = linea_id._id;
  }
  actulizaLinea() {
    this.serviceLinea.atulizarLinea(this.forma.value, this.idLinea)
      .subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu trabajo ha sido actulizado',
          showConfirmButton: false,
          timer: 2000,
        });
        this.cargaLinea();
        this.cerrarModal();
        this.forma.reset();
      }, error => {
        console.log(error);
      })
  }
  guardarLinea() {
    this.serviceLinea.guardarLineaNueva(this.forma.value)
      .subscribe((resp) => {
          Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu trabajo ha sido guardado',
          showConfirmButton: false,
          timer: 2000,
        });
        this.cerrarModal();
        this.cargaLinea();
        this.forma.reset();
      });
  }


  paginacionDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.serviceLinea.totalLinea) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde = desde;
    this.cargaLinea();
  }
  cargaLinea() {
    this.serviceLinea.cargarLinea(this.desde)
    .subscribe((resp: any) => {
      
      this.lineas = resp;

      this.totalRegistro =this.serviceLinea.totalLinea
   
    });
}





  check(estado: any, Id) {
  
    const estadoActual = estado.currentTarget.checked;
    var request = { estado: estadoActual };
    this.serviceLinea.estado(Id, request)
      .subscribe((resp) => {
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se cambio de estado',
        showConfirmButton: false,
        timer: 2000,
      });
        this.cargaLinea();
      });
  }
  seleccionImagen(archivo: File) {
   
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El archivo seleccionado no es una imagen' ,
        timer: 2000,
        showConfirmButton: false,
      });
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
        this.cargaLinea();
        this.cerrarModal();
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a cargar la Imagen' ,
          timer: 2000,
          showConfirmButton: false,
        });
       
      });
  }


buscarLinea( termino: string ) {

  if (termino.trim() == "") {
    this.cargaLinea();
  return;
  }

this.serviceLinea.buscarLine(termino)
.subscribe((lineas)=> {
   this.lineas = lineas;
   this.totalRegistro =this.serviceLinea.totalLinea

})
}


}
