import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { InformeComponent } from './informe/informe.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { Grafico1Component } from './informe/grafico1/grafico1.component';
import { Grafico2Component } from './informe/grafico2/grafico2.component';
import { Grafico3Component } from './informe/grafico3/grafico3.component';
import { Grafico4Component } from './informe/grafico4/grafico4.component';
import { GraficoOrigenComponent } from './informe/graficoOrigen/graficoOrigen.component';
import { ChartjsComponent } from './informe/chartjs/chartjs.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InformeComponent,
    ConfiguracionComponent,
    ResultadoComponent,
    GraficoOrigenComponent,
    Grafico1Component,
    Grafico2Component,
    Grafico3Component,
    Grafico4Component,
    ChartjsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
