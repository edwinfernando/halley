import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabFavoritosPage } from './tab-favoritos.page';

const routes: Routes = [
  {
    path: '',
    component: TabFavoritosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabFavoritosPageRoutingModule {}
