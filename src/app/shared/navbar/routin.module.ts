import { NgModule, ModuleWithProviders } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { LineaComponent } from 'src/app/pages/linea/linea.component';
import { CategoriaComponent } from 'src/app/pages/categoria/categoria.component';
import { ProdcutoComponent } from 'src/app/pages/prodcuto/prodcuto.component';
import { SubirArchivoComponent } from 'src/app/pages/subir-archivo/subir-archivo.component';
import { LoginComponent } from 'src/app/login/login/login.component';
import { PagesComponent } from 'src/app/pages/pages.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginGuard } from 'src/app/guards/login.guard';




/*se importan los componentes creados */

const appRoutes: Routes = [

  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'linea', component: LineaComponent },
      { path: 'categoria/:id', component: CategoriaComponent },
      { path: 'producto/:id', component: ProdcutoComponent },
      { path: 'subirArchivo', component: SubirArchivoComponent },
      { path: '', redirectTo: 'linea', pathMatch: 'full' }
    ]
  },

  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },



  // otherwise redirect to home
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })

  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
