import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabBuscarPage } from './tab-buscar.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabBuscarPageRoutingModule } from './tab-buscar-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabBuscarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabBuscarPage]
})
export class TabBuscarPageModule {}
