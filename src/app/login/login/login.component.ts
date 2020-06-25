import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  constructor(public serviceLogin: LoginService,
    public router: Router) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      role: new FormControl('ROL_ADMIN'),
    });
  }

  login() {
    this.serviceLogin.loginUsuario(this.forma.value)
    
    .subscribe((resp) => {
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Bienvenido ' + this.serviceLogin.usuario
      })
      console.log(resp);
      if(resp['error']) {
        console.log('credenciales mal')
      }else {
        this.router.navigate(['/linea']);
      }
     
    })

  }

}
