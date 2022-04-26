import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria, Promocion } from '../interfaces/interfaces';
import { DataService } from '../services/data.service';
import { UtilidadesService } from '../services/utilidades.service';
import { DataLocalService } from '../services/data-local.service';
import { HeaderTabsComponent } from '../components/header-tabs/header-tabs.component';

@Component({
  selector: 'app-tab-promociones',
  templateUrl: './tab-promociones.page.html',
  styleUrls: ['./tab-promociones.page.scss'],
})
export class TabPromocionesPage implements OnInit {

  titulo = 'Promociones';
  categorias: Categoria[] = [];
  @ViewChild(HeaderTabsComponent) toolbarComponent: HeaderTabsComponent;
 // latLngOrigen: any;
 // latLngDestino: any[];
  lPromociones: Promocion[] = [];
  constructor(private dataService: DataService,
              private dataLocal: DataLocalService,
             // private activeRoute: ActivatedRoute,
              private utilService: UtilidadesService) { }

  ngOnInit() {
    this.dataService.getCategorias().subscribe(resp => {
      this.categorias = resp;
    });

    this.cargarPromociones();
  }

  ionViewWillEnter() {
    this.toolbarComponent.cambiarUbicacion();
  }

  cargarPromociones(){
    this.dataLocal.getUbicacion().then(dir => {
      this.dataService.getPromociones().subscribe(resp => {
        this.lPromociones = resp;
      });
    });  
  }

  segmentChanged(event) {
    const segmento = event.detail.value;

    if (segmento !== 'Todos') {
      for (const categoria of this.categorias) {
        if (categoria.name === segmento) {
           // this.getServiciosPorCategoria(categoria.id);
        }
      }
    }else {
     // this.getServicios();
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.cargarPromociones();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 100);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
    }, 500);
  }

 /* loadDistanciaServicios() {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.latLngOrigen],
        destinations: this.latLngDestino,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      (response, status) => {
        if (status !== 'OK') {
          alert('Error was: ' + status);
          this.utilService.dissmisLoading();
        } else {
          const results = response.rows[0].elements;

          for (let j = 0; j < results.length; j++) {
            this.servicios[j].km = results[j].distance.text;
            this.servicios[j].min = results[j].duration.text;
          }

          this.utilService.dissmisLoading();
        }
      });
  }*/
}
