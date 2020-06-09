import { Component, OnInit } from '@angular/core';
import { UploadPlanoService } from 'src/app/service/upload-plano.service';
import swal from 'sweetalert';
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
      swal('Solo Archivos', 'El archivo seleccionado no es  .csv', 'error');
      this.archivoSubir = null;
     
      return;
    }
    this.archivoSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
  }
  subirArchivos() {
    this.serviceUploadPlano.subirArchivo(this.archivoSubir)
      .then(resp => {
        swal('Excelente', 'Subido exitosamente', 'success');
       
      })
      .catch(err => {
        swal('Solo Archivos .CSV', 'Error a cargar el archivo', 'error');
      });
  }

}
