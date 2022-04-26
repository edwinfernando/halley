import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabInicioPage } from './tab-inicio.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabInicioPageRoutingModule } from './tab-inicio-routing.module';
import { ComponentsModule } from '../components/components.module';
import { EventosPageModule } from '../pages/eventos/eventos.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabInicioPageRoutingModule,
    ComponentsModule,
    EventosPageModule
  ],
  declarations: [TabInicioPage]
})
export class TabInicioPageModule {}
