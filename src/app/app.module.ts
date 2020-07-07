import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { InformeComponent } from './informe/informe.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { Grafico1Component } from './informe/grafico1/grafico1.component';
import { Grafico2Component } from './informe/grafico2/grafico2.component';
import { Grafico3Component } from './informe/grafico3/grafico3.component';
import { Grafico4Component } from './informe/grafico4/grafico4.component';
import { GraficoOrigenComponent } from './informe/graficoOrigen/graficoOrigen.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from './inicio/globalService.service';
import { HeaderComponent } from './inicio/header/header.component';
import { FooterComponent } from './inicio/footer/footer.component';
import { Inicio2Component } from './inicio2/inicio2/inicio2.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InformeComponent,
    ConfiguracionComponent,
    GraficoOrigenComponent,
    Grafico1Component,
    Grafico2Component,
    Grafico3Component,
    Grafico4Component,
    HeaderComponent,
    FooterComponent,
    Inicio2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    GlobalService
  ],
  bootstrap: [AppComponent, InicioComponent]
})
export class AppModule { }
