import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Categoria, Servicio, Location, MUNICIPIO, TodosServicios } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { UtilidadesService } from '../../services/utilidades.service';
import { DataLocalService } from '../../services/data-local.service';
import { HeaderTabsComponent } from '../../components/header-tabs/header-tabs.component';
import { MapsService } from '../../services/maps.service';
import { ModalService } from '../../services/modal.service';


declare var google;
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit, AfterViewInit {

  @ViewChild(HeaderTabsComponent) toolbarComponent: HeaderTabsComponent;

  categorias: Categoria[] = [];
  latLngOrigen: Location;
  latLngDestino: Location[];
  servicios: Servicio[] = [];
  serviciosTemp: Servicio[] = [];
  todosServicios: TodosServicios[] = [];

  tServicio: TodosServicios;

  latLng: any;

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

  segmento = 'Todos';

  constructor(private dataService: DataService,
              private utilService: UtilidadesService,
              private dataLocal: DataLocalService,
              private modalService: ModalService,
              private mapsService: MapsService) { }

   ngOnInit() {
    this.dataService.getCategorias().subscribe(resp => {
      this.categorias = resp;
    });

    this.getUbicacion();
  }

  ngAfterViewInit() {
  }

  async getUbicacion(){
    this.utilService.showLoading();
    const latLng = await this.mapsService.getLocation();
    console.log('Aqui es: ' + latLng);
    if (latLng !== undefined) {
      this.latLng = this.mapsService.convertLatLng(latLng.lat, latLng.lng); /// <--- Esto se debe usar para guardar la locacion

      this.mapsService.getPlaceIdToLocation(this.latLng).then(data => {
        console.log(data);

        let location;
        for (let i = 0; i < data.address_components.length; i++) {
          if (data.address_components[i].types[0] == 'locality') {
            location = data.address_components[i].long_name;
          }
        }

        this.dataService.getMunicipios().subscribe( (munis: MUNICIPIO[]) => {
          console.log(munis);
          this.municipio = munis.filter( muni => muni.ubicacion.municipio === location)[0];
          this.municipio.miUbicacion = this.latLng;
          this.dataLocal.setUbicacion(this.municipio);
          this.cargarServicios();
        });
       // this.utilService.dissmisLoading();
      });
    } else {
      this.utilService.dissmisLoading();
      const data = await this.modalService.showModalVerMas('Información', 'No se pudo realizar la consulta, por favor revise los permisos de navegación e intente nuevamente.', null);

      console.log(data);

      if (data){
        location.reload();
      }
    }
    
  }

  cargarServicios(){
    this.latLngDestino = [];
    this.latLngOrigen = this.municipio.miUbicacion;

    console.log(this.latLngOrigen);

    if (this.latLngOrigen !== undefined) {
      this.dataService.getServicios().subscribe( (resp: Servicio[]) => {
        this.servicios = resp.filter( servicio => servicio.ubicacion.municipio === this.municipio.nombre);
        this.servicios.forEach(servicio => {
          this.latLngDestino.push(servicio.ubicacion.location);  
        });
        this.calcularDistanciaServicios();
        this.cargarTodos();

        this.serviciosTemp = this.servicios;
      });
    } else {
      this.utilService.dissmisLoading();
    }

    console.log(this.servicios);
  }

  /** Aqui se debe enviar el codigo o nombre del municipio para consultar los servicios */
  segmentChanged(event) {
    this.segmento = event.detail.value;

    if (this.segmento !== 'Todos') {
      for (const categoria of this.categorias) {
        if (categoria.name === this.segmento) {
          console.log(categoria);
           // this.getServiciosPorCategoria(categoria.id);
           this.servicios = this.serviciosTemp.filter( servicio => servicio.categoria === categoria.id);
           console.log(this.servicios);
           this.cargarTodos();
        }
      }
    }else {
      this.cargarServicios();
    }
  }

  cargarTodos() {
    this.todosServicios = [];

    for (const categoria of this.categorias) {
      this.tServicio = {
        numServicios: 0,
        nombreCategoria: categoria.name,
        servicios: this.servicios.filter(servicio =>  servicio.categoria === categoria.id)
      };

      this.tServicio.numServicios = this.tServicio.servicios.length;
      if(this.tServicio.numServicios > 0 )
        this.todosServicios.push(this.tServicio);
    }

    console.log(this.todosServicios);
  }

  doRefresh(event) {
    this.cargarServicios();
    setTimeout(() => {
      event.target.complete();
    }, 100);
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  calcularDistanciaServicios() {
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
  }
  /*async getMunicipio(){
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
  }*/

  cambiarMunicipio(){
    this.servicios = [];
    this.latLngOrigen = null;
    this.latLngDestino = [];

    this.dataLocal.getUbicacion().then( (resp: MUNICIPIO) => {
      if (resp !== null) {
        this.municipio = resp;
        this.municipio.miUbicacion = this.latLng;
        this.cargarServicios();
      } else {
       // this.getUbicacion();
        this.utilService.dissmisLoading();
      }
    });
  }
}
