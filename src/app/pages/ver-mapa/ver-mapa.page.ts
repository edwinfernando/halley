import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { ActivatedRoute } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';

declare var google;
@Component({
  selector: 'app-ver-mapa',
  templateUrl: './ver-mapa.page.html',
  styleUrls: ['./ver-mapa.page.scss'],
})
export class VerMapaPage implements OnInit, AfterViewInit {

  @ViewChild('map',  {static: false}) mapElement: ElementRef;

  titulo: any;
  latLngOrigen: any;
  latLngDestino: any;

  direccionService = new google.maps.DirectionsService();
  direccionDisplay = new google.maps.DirectionsRenderer();

  constructor(private mapsService: MapsService,
              private utilService: UtilidadesService,
              private activeRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe( resp => {
      this.latLngDestino = JSON.parse(resp.location);
      console.log(this.latLngDestino);
      this.latLngDestino = this.mapsService.convertLatLng(this.latLngDestino.lat, this.latLngDestino.lng);
      this.titulo = resp.titulo;
    });
  }

  async ngAfterViewInit() {
    await this.loadMap2();
    this.calculateAndDisplayRoute();
  }

  async loadMap2(){
    this.utilService.showLoading();
    const latLng = await this.mapsService.getLocation();
    this.latLngOrigen = this.mapsService.convertLatLng(latLng.lat, latLng.lng);
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    const mapa = await this.mapsService.createMap(this.mapElement.nativeElement, 15, this.latLngOrigen);
    this.direccionDisplay.setMap(mapa);
    this.direccionDisplay.setPanel(indicatorsEle);
    this.utilService.dissmisLoading();
  }

  calculateAndDisplayRoute() {
    this.direccionService.route(
      {
        origin:  this.latLngOrigen,
        destination:  this.latLngDestino, // origen
        // waypoints: this.waypoint
        // optimizeWaypoints: true,
        provideRouteAlternatives: true,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
          trafficModel: 'optimistic'
        }
      },
      (response, status) => {
        if (status === 'OK') {
          this.direccionDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}
