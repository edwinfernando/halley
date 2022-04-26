import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabFavoritosPage } from './tab-favoritos.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabFavoritosPageRoutingModule } from './tab-favoritos-routing.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TabFavoritosPage }]),
    TabFavoritosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabFavoritosPage]
})
export class TabFavoritosPageModule {}
