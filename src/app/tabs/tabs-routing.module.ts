import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tab-inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab-inicio',
        loadChildren: () => import('../tab-inicio/tab-inicio.module').then(m => m.TabInicioPageModule)
      },
      {
        path: 'tab-inicio/ver-ubicacion',
        loadChildren: () => import('../pages/ver-ubicacion/ver-ubicacion.module').then( m => m.VerUbicacionPageModule)
      },
      {
        path: 'tab-inicio/eventos',
        loadChildren: () => import('../pages/eventos/eventos.module').then( m => m.EventosPageModule)
      },
      {
        path: 'tab-inicio/eventos-detalle',
        loadChildren: () => import('../pages/eventos-detalle/eventos-detalle.module').then( m => m.EventosDetallePageModule)
      },
      {
        path: 'tab-inicio/info-municipios',
        loadChildren: () => import('../pages/info-municipios/info-municipios.module').then( m => m.InfoMunicipiosPageModule)
      },
      {
        path: 'tab-inicio/ver-mapa',
        loadChildren: () => import('../pages/ver-mapa/ver-mapa.module').then( m => m.VerMapaPageModule)
      },
      {
        path: 'tab-buscar',
        loadChildren: () => import('../tab-buscar/tab-buscar.module').then(m => m.TabBuscarPageModule)
      },
      {
        path: 'tab-promociones',
        loadChildren: () => import('../tab-promociones/tab-promociones.module').then( m => m.TabPromocionesPageModule)
      },
      {
        path: 'tab-favoritos',
        loadChildren: () => import('../tab-favoritos/tab-favoritos.module').then(m => m.TabFavoritosPageModule)
      },
      {
        path: 'tab-contactenos',
        loadChildren: () => import('../tab-contactenos/tab-contactenos.module').then( m => m.TabContactenosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
