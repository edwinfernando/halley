import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoMunicipiosPage } from './info-municipios.page';

const routes: Routes = [
  {
    path: '',
    component: InfoMunicipiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoMunicipiosPageRoutingModule {}
