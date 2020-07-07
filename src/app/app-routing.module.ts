import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from "src/app/inicio/inicio.component";
import { InformeComponent } from "src/app/informe/informe.component";
import { ConfiguracionComponent } from "src/app/configuracion/configuracion.component";


const routes: Routes = [
  { path: 'inicio',  component: InicioComponent },
  { path: 'inicio/informe', component: InformeComponent },
  { path: 'inicio/configuracion', component: ConfiguracionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
