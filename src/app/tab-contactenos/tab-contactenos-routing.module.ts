import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabContactenosPage } from './tab-contactenos.page';

const routes: Routes = [
  {
    path: '',
    component: TabContactenosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabContactenosPageRoutingModule {}
