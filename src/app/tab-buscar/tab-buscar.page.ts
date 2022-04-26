import { Component, OnInit, ViewChild } from '@angular/core';
import { Servicio } from '../interfaces/interfaces';
import { DataService } from '../services/data.service';
import { MapsService } from '../services/maps.service';
import { async } from '@angular/core/testing';
import { HeaderTabsComponent } from '../components/header-tabs/header-tabs.component';

declare var google;
@Component({
  selector: 'app-tab-buscar',
  templateUrl: 'tab-buscar.page.html',
  styleUrls: ['tab-buscar.page.scss']
})
export class TabBuscarPage implements OnInit {

  titulo = 'Buscar';
  servicios: Servicio[] = [];
  @ViewChild(HeaderTabsComponent) toolbarComponent: HeaderTabsComponent;
  ideas: string[] = ['El salto del tigre', 'Restaurantes', 'Cueva del indio', 'Comida francesa'];
  textoBuscar: string;
  buscando = false;
  latLngOrigen: any;
  latLngDestino: any[];
  constructor(private dataService: DataService,
              private mapsService: MapsService) {

  }

  async ngOnInit(){
    const latLng = await this.mapsService.getLocation();
    this.latLngOrigen = this.mapsService.convertLatLng(latLng.lat, latLng.lng);
  }

  ionViewWillEnter() {
    this.toolbarComponent.cambiarUbicacion();
  }

  buscar(event) {
    const valor = event.detail.value.toLowerCase();
    const valorCapitalized = valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
    // console.log(valor);
    if (valor.length === 0) {
      this.buscando = false;
      this.servicios = [];
      return;
    }

    this.buscando = true;
    this.latLngDestino = [];
    this.dataService.getServicios().subscribe(resp => {
      this.servicios = resp;
      this.servicios = this.servicios.filter(serv => serv.nombre.includes(valor) || serv.nombre.includes(valorCapitalized));
      this.buscando = false;
      this.servicios.forEach(servicio => {
        this.latLngDestino.push(servicio.ubicacion.location);
      });

      console.log(event);

      if (this.servicios.length > 0){
    //    this.loadDistanciaServicios();
      }
    });
  }

  loadDistanciaServicios() {
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
         // this.utilService.dissmisLoading();
         // this.buscando = false;
        } else {
          const results = response.rows[0].elements;

          for (let j = 0; j < results.length; j++) {
            this.servicios[j].km = results[j].distance.text;
            this.servicios[j].min = results[j].duration.text;
          }

        //  this.utilService.dissmisLoading();
         // this.buscando = false;
        }
      });
  }
}
