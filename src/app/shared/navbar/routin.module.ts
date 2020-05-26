import { NgModule, ModuleWithProviders } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import { LineaComponent } from 'src/app/pages/linea/linea.component';
import { CategoriaComponent } from 'src/app/pages/categoria/categoria.component';
import { ProdcutoComponent } from 'src/app/pages/prodcuto/prodcuto.component';




/*se importan los componentes creados */

const appRoutes: Routes = [

  { path : 'linea' , component: LineaComponent },

  { path : 'categoria' , component: CategoriaComponent },
  { path : 'categoria/:id' , component: CategoriaComponent },
  { path : 'producto' , component: ProdcutoComponent },
  { path : 'producto/:id' , component: ProdcutoComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: 'catalogo',pathMatch: 'full' }
];

@NgModule({
  imports : [
    RouterModule.forRoot(appRoutes,{ useHash: true})
    
  ],
  exports : [
    RouterModule
  ]
})
export class RoutingModule {}
