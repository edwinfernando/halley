import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabContactenosPageRoutingModule } from './tab-contactenos-routing.module';

import { TabContactenosPage } from './tab-contactenos.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabContactenosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabContactenosPage]
})
export class TabContactenosPageModule {}
