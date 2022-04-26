import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilidadesService } from '../services/utilidades.service';
import { MapsService } from '../services/maps.service';
import { DataLocalService } from '../services/data-local.service';
import { MUNICIPIO } from '../interfaces/interfaces';
import { DataService } from '../services/data.service';
import { HeaderTabsComponent } from '../components/header-tabs/header-tabs.component';
import { EventosPage } from '../pages/eventos/eventos.page';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-tab-inicio',
  templateUrl: 'tab-inicio.page.html',
  styleUrls: ['tab-inicio.page.scss']
})
export class TabInicioPage implements OnInit{

  latLng: any;
  isScrolleable = false;
  @ViewChild(EventosPage) toolbarComponent: EventosPage;
  municipio: MUNICIPIO = {
    codigo: '',
    nombre: '',
    departamento: '',
    cargo: '',
    alcalde: '',
    periodo: '',
    fundacion: '',
    ereccion: '',
    superficie: '',
    altitud: '',
    poblacion: '',
    densidad: '',
    urbano: '',
    gentilicio: '',
    descripcion: '',
    historia: '',
    economia: '',
    cultura: '',
    himno: '',
    url: '',
    colorPredominante: '',
    ubicacion: null,
    miUbicacion: null,
    imagenes: [],
    imagenSimbolos: [],
    numerosEmergencia: []
  };

  constructor(private utilService: UtilidadesService,
              private mapsService: MapsService,
              private dataLocal: DataLocalService,
              private dataService: DataService,
              private modalService: ModalService) {}

  ngOnInit(){
   // this.utilService.showLoading();
   // this.getUbicacion();
  }

  ionViewWillEnter() {
    this.toolbarComponent.cambiarMunicipio();
  }

  async getUbicacion(){
    const latLng = await this.mapsService.getLocation();
    console.log(latLng);
    if (latLng !== undefined) {
      this.latLng = this.mapsService.convertLatLng(latLng.lat, latLng.lng); /// <--- Esto se debe usar para guardar la locacion
      console.log(this.latLng);
      this.mapsService.getPlaceIdToLocation(this.latLng).then(data => {
        console.log(data);

        let infoPosition = 'Place id = ' + data.place_id + "/n";
        infoPosition += 'Dirección = ' + data.formatted_address +"/n";
        
        for (let i = 0; i < data.address_components.length; i++) {
          infoPosition += data.address_components[i].types[0] + ' = ' + data.address_components[i].long_name +"/n";
        }
        
        infoPosition += 'Lng = ' + latLng.lng +"/n";
        infoPosition += 'Lat = ' + latLng.lat +"/n";

        this.modalService.showModalVerMas('Ubicación', infoPosition, null);

       /* this.dataService.getMunicipios().subscribe( (munis: MUNICIPIO[]) => {
          this.municipio = munis.filter( muni => muni.ubicacion.municipio === data.address_components[1].long_name)[0];
          this.municipio.miUbicacion = this.latLng;
          this.dataLocal.setUbicacion(this.municipio);
        });*/
      });
    }else {
      this.utilService.dissmisLoading();
    }
  }

  onClickPosition(){
    this.getUbicacion();
  }
}
