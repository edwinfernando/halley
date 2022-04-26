import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoMunicipiosPageRoutingModule } from './info-municipios-routing.module';

import { InfoMunicipiosPage } from './info-municipios.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoMunicipiosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InfoMunicipiosPage]
})
export class InfoMunicipiosPageModule {}
