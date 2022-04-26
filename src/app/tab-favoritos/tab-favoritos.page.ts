import { Component, OnInit } from '@angular/core';
import { Servicio, Categoria } from '../interfaces/interfaces';
import { DataService } from '../services/data.service';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-tab-favoritos',
  templateUrl: 'tab-favoritos.page.html',
  styleUrls: ['tab-favoritos.page.scss']
})
export class TabFavoritosPage implements OnInit {

  titulo = 'Favoritos';
  servicios: Servicio[] = [];
  categorias: Categoria[] = [];
  misCategorias: Categoria[] = [];
  favoritosPorCategoria: { categoria: string, servicios: Servicio[]}[] = [];
  constructor(private dataService: DataService,
              private dataLocal: DataLocalService) {}

  ngOnInit() {
    this.dataService.getCategorias()
        .subscribe( resp => {
          this.categorias = resp;
        });
  }

  ionViewWillEnter() {
    this.getCargarFavoritos();
  }

  async getCargarFavoritos() {
    this.servicios = await this.dataLocal.cargarFavoritos();
    this.getMisCategorias(this.servicios);
    this.getServiciosPorCategoria(this.misCategorias, this.servicios);
    console.log(this.servicios);
    console.log(this.categorias);
  }

  getMisCategorias(servicios: Servicio[]) {
    this.misCategorias = [];
    servicios.forEach(servicio => {
      console.log(servicio);
      this.categorias.forEach(categoria => {
       console.log(categoria);
        if (servicio.categoria === categoria.id) {
          if (!this.misCategorias.includes(categoria)) {
            this.misCategorias.push(categoria);
          }
        }
      });
    });
  }

  getServiciosPorCategoria(categorias: Categoria[], servicios: Servicio[]) {
    this.favoritosPorCategoria = [];

    categorias.forEach( categoria => {
      this.favoritosPorCategoria.push({
        categoria: categoria.name,
        servicios: servicios.filter( servicio => {
          return (servicio.categoria.toString().indexOf(categoria.id.toString()) > -1);
        })
      });
    });

  }
}
