import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineaComponent } from './pages/linea/linea.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { ProdcutoComponent } from './pages/prodcuto/prodcuto.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RoutingModule } from './shared/navbar/routin.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';

import { ModalService } from './modal/modal.service';
import { ModalComponent } from './modal/modal.component';

// servicios

import { LineaService } from './service/linea.service';
import { CategoriaService } from './service/categoria.service';
import { ProductoService } from './service/producto.service';
import { SubirArchivosService } from './service/subir-archivos.service';
import { SubirArchivoComponent } from './pages/subir-archivo/subir-archivo.component';





@NgModule({
  declarations: [
    AppComponent,
    LineaComponent,
    CategoriaComponent,
    ProdcutoComponent,
    NavbarComponent,
    ModalComponent,
    SubirArchivoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [LineaService, ModalService, CategoriaService, ProductoService, SubirArchivosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
