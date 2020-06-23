import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  subirArchivo(archivo: File, tipo: string, id: string){

    return new Promise((resolve, reject)=>{

      let  formData = new FormData();
      let xhr =  new  XMLHttpRequest();

      formData.append( 'img', archivo, archivo.name);
      xhr.onreadystatechange = function(){
        if( xhr.readyState === 4) {
          if(xhr.status === 200){
            resolve(JSON.parse(xhr.response) );
          } else {
           
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + '/onedrive.live.com/?id=root&cid=9A7889A20AD5ED4F/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });



  }
}