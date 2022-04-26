import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerUbicacionPageRoutingModule } from './ver-ubicacion-routing.module';

import { VerUbicacionPage } from './ver-ubicacion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerUbicacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VerUbicacionPage]
})
export class VerUbicacionPageModule {}
