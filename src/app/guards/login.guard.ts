import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  CanActivate
} from "@angular/router";
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
import swal from 'sweetalert'
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      
    if (this.loginService.sesionIniciada()) {
      return true;
    }
    this.router.navigate(["/linea"]);
    return false;
  }
}