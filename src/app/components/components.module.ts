import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTabsComponent } from './header-tabs/header-tabs.component';
import { IonicModule } from '@ionic/angular';
import { ImagenSimbolosComponent } from './imagen-simbolos/imagen-simbolos.component';
import { PipesModule } from '../pipes/pipes.module';
import { BotonVoytuComponent } from './boton-voytu/boton-voytu.component';
import { ItemServicioComponent } from './item-servicio/item-servicio.component';
import { SlideImagenesComponent } from './slide-imagenes/slide-imagenes.component';
import { LugaresCercanosComponent } from './lugares-cercanos/lugares-cercanos.component';
import { VerMasComponent } from './modals/ver-mas/ver-mas.component';
import { ContactarComponent } from './modals/contactar/contactar.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { ItemPromocionComponent } from './item-promocion/item-promocion.component';
import { PromocionComponent } from './modals/promocion/promocion.component';
import { EmergenciasComponent } from './modals/emergencias/emergencias.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { MunicipiosComponent } from './modals/municipios/municipios.component';
import { ExpandibleComponent } from './expandible/expandible.component';
import { CartaComponent } from './carta/carta.component';

@NgModule({
  declarations: [
    HeaderTabsComponent,
    ImagenSimbolosComponent,
    BotonVoytuComponent,
    ItemServicioComponent,
    SlideImagenesComponent,
    LugaresCercanosComponent,
    VerMasComponent,
    ContactarComponent,
    PromocionesComponent,
    ItemPromocionComponent,
    PromocionComponent,
    EmergenciasComponent,
    MunicipiosComponent,
    ExpandibleComponent,
    CartaComponent
  ],
  exports: [
    HeaderTabsComponent,
    ImagenSimbolosComponent,
    BotonVoytuComponent,
    ItemServicioComponent,
    SlideImagenesComponent,
    LugaresCercanosComponent,
    VerMasComponent,
    ContactarComponent,
    PromocionesComponent,
    ItemPromocionComponent,
    PromocionComponent,
    EmergenciasComponent,
    MunicipiosComponent,
    ExpandibleComponent,
    CartaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  providers: [
    CallNumber
  ]
})
export class ComponentsModule { }
