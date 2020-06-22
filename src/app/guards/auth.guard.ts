import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  CanActivate
} from "@angular/router";
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      
    if (!this.loginService.sesionIniciada()) {
      return true;
    }
    console.log('No tiene permiso!', 'error token',  'error');
    this.router.navigate(["/login"]);
    return false;
  }
}