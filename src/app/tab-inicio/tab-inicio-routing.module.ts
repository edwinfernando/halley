import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabInicioPage } from './tab-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: TabInicioPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabInicioPageRoutingModule {}
