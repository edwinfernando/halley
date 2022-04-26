import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosDetallePageRoutingModule } from './eventos-detalle-routing.module';

import { EventosDetallePage } from './eventos-detalle.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosDetallePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EventosDetallePage],
  exports: [
    EventosDetallePage
  ]
})
export class EventosDetallePageModule {}
