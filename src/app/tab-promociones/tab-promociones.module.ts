import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPromocionesPageRoutingModule } from './tab-promociones-routing.module';

import { TabPromocionesPage } from './tab-promociones.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPromocionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabPromocionesPage]
})
export class TabPromocionesPageModule {}
