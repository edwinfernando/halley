import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMapaPageRoutingModule } from './ver-mapa-routing.module';

import { VerMapaPage } from './ver-mapa.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMapaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VerMapaPage]
})
export class VerMapaPageModule {}
