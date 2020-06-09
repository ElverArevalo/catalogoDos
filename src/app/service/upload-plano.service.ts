import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadPlanoService {

  subirArchivo(archivo: File){

    return new Promise((resolve, reject)=>{

      let  formData = new FormData();
      let xhr =  new  XMLHttpRequest();

      formData.append( 'arch', archivo, archivo.name);
      xhr.onreadystatechange = function(){
        if( xhr.readyState === 4) {
          if(xhr.status === 200){
            resolve(JSON.parse(xhr.response) );
          } else {
          
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + '/archivo/archivos/';
      xhr.open('POST', url, true);
      xhr.send(formData);

    });



  }
}
