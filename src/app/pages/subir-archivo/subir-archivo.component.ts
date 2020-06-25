import { Component, OnInit } from '@angular/core';
import { UploadPlanoService } from 'src/app/service/upload-plano.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.css']
})
export class SubirArchivoComponent implements OnInit {
  archivoSubir: File;
  constructor(public serviceUploadPlano: UploadPlanoService) { }

  ngOnInit(): void {
  }

  seleccionArchivo(archivo: File) {
    console.log(archivo);
    if (!archivo) {
      this.archivoSubir = null;
      return;
    }
    if (archivo.type.indexOf('application/vnd.ms-excel') < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error a cargar el archivo, El archivo seleccionado no es  .csv' ,
        timer: 2000,
        showConfirmButton: false,
      });
      
     
      return;
    }
    this.archivoSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
  }
  subirArchivos() {
    this.serviceUploadPlano.subirArchivo(this.archivoSubir)
      .then(resp => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu trabajo ha sido guardado',
          showConfirmButton: false,
          timer: 2000,
        });
       
       
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error a cargar el archivo, el formato debe ser .CSV' ,
          timer: 2000,
          showConfirmButton: false,
        });
        
      });
  }

}
