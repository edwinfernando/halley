import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerUbicacionPage } from './ver-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: VerUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerUbicacionPageRoutingModule {}
