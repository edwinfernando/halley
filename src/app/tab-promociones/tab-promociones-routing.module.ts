import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPromocionesPage } from './tab-promociones.page';

const routes: Routes = [
  {
    path: '',
    component: TabPromocionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPromocionesPageRoutingModule {}
