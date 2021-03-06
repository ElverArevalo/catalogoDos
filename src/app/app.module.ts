import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineaComponent } from './pages/linea/linea.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ProdcutoComponent } from './pages/prodcuto/prodcuto.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RoutingModule } from './shared/navbar/routin.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalService } from './modal/modal.service';
import { ModalComponent } from './modal/modal.component';

// servicios

import { LineaService } from './service/linea.service';
import { CategoriaService } from './service/categoria.service';
import { ProductoService } from './service/producto.service';
import { SubirArchivosService } from './service/subir-archivos.service';
import { SubirArchivoComponent } from './pages/subir-archivo/subir-archivo.component';
import { LoginComponent } from './login/login/login.component';
import { LoginService } from './service/login.service';
import { UploadPlanoService } from './service/upload-plano.service';
import { PagesComponent } from './pages/pages.component';
import { URL_SERVICIOS } from './config/config';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { JwtInterceptor } from './helper/jtw.JwtInterceptor';
import { ErrorInterceptor } from './helper/error.interceptor';


export function tokenGetter() {
  return localStorage.getItem("token");
}




@NgModule({
  declarations: [
    AppComponent,
    LineaComponent,
    CategoriaComponent,
    ProdcutoComponent,
    NavbarComponent,
    ModalComponent,
    SubirArchivoComponent,
    LoginComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [URL_SERVICIOS],
        blacklistedRoutes: [],
        headerName: "token",
        authScheme: '',
        skipWhenExpired : true
      }
    }),
  ],
  providers: [
    LineaService, 
    ModalService, 
    CategoriaService, 
    ProductoService, 
    SubirArchivosService,
    UploadPlanoService,
    LoginService,
    AuthGuard,
    LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
