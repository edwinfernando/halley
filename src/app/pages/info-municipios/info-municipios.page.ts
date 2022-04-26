import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HeaderTabsComponent } from '../../components/header-tabs/header-tabs.component';
import { MUNICIPIO } from '../../interfaces/interfaces';
import { ModalService } from '../../services/modal.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { MapsService } from '../../services/maps.service';
import { DataLocalService } from '../../services/data-local.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-info-municipios',
  templateUrl: './info-municipios.page.html',
  styleUrls: ['./info-municipios.page.scss'],
})
export class InfoMunicipiosPage implements OnInit {
  latLng: any;
  isScrolleable = false;
  @ViewChild(HeaderTabsComponent) toolbarComponent: HeaderTabsComponent;
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

  constructor(private modalService: ModalService,
              private utilService: UtilidadesService,
              private mapsService: MapsService,
              private dataLocal: DataLocalService,
              private dataService: DataService) {}

  ngOnInit(){
    this.utilService.showLoading();
    this.dataLocal.getUbicacion().then(resp => {
      this.municipio = resp;
    });
  //  this.getUbicacion();
  }

  ionViewWillEnter() {
    this.toolbarComponent.cambiarUbicacion();
    this.utilService.dissmisLoading();
  }

  async getUbicacion(){
    const latLng = await this.mapsService.getLocation();
    this.latLng = this.mapsService.convertLatLng(latLng.lat, latLng.lng); /// <--- Esto se debe usar para guardar la locacion

    this.mapsService.getPlaceIdToLocation(this.latLng).then(data => {
      this.dataService.getMunicipios().subscribe( (munis: MUNICIPIO[]) => {
        this.municipio = munis.filter( muni => muni.ubicacion.municipio === data.address_components[1].long_name)[0];
        this.municipio.miUbicacion = this.latLng;
        this.dataLocal.setUbicacion(this.municipio);
      });
      this.utilService.dissmisLoading();
    });
  }

  onScrollStart(isScroll){
    this.isScrolleable = isScroll;
  }

  onScrollEnd(isScroll){
    this.isScrolleable = isScroll;
  }

  onClickModalVerMas(titulo: string, ev: any, contenido: string){
    this.modalService.showModalVerMas(titulo, contenido, ev);
  }

  onClickSOS(ev: any){
    this.modalService.showModalEmergencia(this.municipio.numerosEmergencia, ev);
  }

  recortarCadena(cadena: string){
    return cadena.substring(0, 200) + '...';
  }

  async getMunicipio(){
    this.utilService.showLoading();
    const latLng = await this.mapsService.getLocation();
    this.latLng = this.mapsService.convertLatLng(latLng.lat, latLng.lng);
    this.dataLocal.getUbicacion().then( resp => {
      this.dataService.getMunicipios().subscribe( (munis: MUNICIPIO[]) => {
        this.municipio = munis.filter( muni => muni.codigo === resp.codigo)[0];
        this.municipio.miUbicacion = this.latLng;
        this.dataLocal.setUbicacion(this.municipio);
        this.utilService.dissmisLoading();
      });
    });
  }
 
  cambiarMunicipio(){
    this.dataLocal.getUbicacion().then( resp => {
      this.municipio = resp;
      console.log(resp);
      this.utilService.dissmisLoading();
    });
  }
}
