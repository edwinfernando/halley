import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio, Ubicacion, MUNICIPIO } from '../../interfaces/interfaces';
import { MapsService } from '../../services/maps.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

declare var google;
@Component({
  selector: 'app-ver-ubicacion',
  templateUrl: './ver-ubicacion.page.html',
  styleUrls: ['./ver-ubicacion.page.scss'],
})
export class VerUbicacionPage implements OnInit {

  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  latLng: any;
  ubicacion: string;
  direccion: Ubicacion = {
    codigo: '',
    placeId: '',
    location: {
      lat: 0,
      lng: 0
    },
    direccion: 'Calle',
    departamento: '',
    municipio: '',
    isChecked: true
  };
  autocomplete: { input: string; };
  autocompleteItems: any[];
  GoogleAutocomplete: any;

  buscando = false;
  servicios: Servicio[] = [];

  constructor(private router: Router,
              private mapsService: MapsService,
              private utilService: UtilidadesService,
              private dataService: DataService,
              private navCtrl: NavController,
              private dataLocal: DataLocalService,
              private zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    this.utilService.showLoading();
  }

  ngAfterViewInit() {
    this.dataLocal.getUbicacion().then( (resp: MUNICIPIO) => {
      this.direccion = resp.ubicacion;
      this.ubicacion = this.direccion.municipio;
      this.getUbicacion();
    });
  }

  async getUbicacion(){
    this.latLng = this.mapsService.convertLatLng(this.direccion.location.lat, this.direccion.location.lng);
    const mapa = await this.mapsService.createMap(this.mapElement.nativeElement, 15, this.latLng);
    this.utilService.dissmisLoading();
  }

  updateSearchResults(){
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({input: this.autocomplete.input},
        (predictions, status) => {
          this.autocompleteItems = [];
          this.zone.run(() => {
            predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  clearAutocomplete(){
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

  

  buscar(event) {
    const valor = event.detail.value;
    // console.log(valor);

    if (valor.length === 0) {
      this.buscando = false;
      this.servicios = [];
      return;
    }

    this.buscando = true;
    this.dataService.getServicios().subscribe( resp => {
      this.servicios = resp;
      this.servicios = this.servicios.filter( serv => serv.nombre.includes(valor));
      this.buscando = false;
    });
  }

  gotoBack() {
    this.navCtrl.back();
  }
}
