import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { UtilidadesService } from '../../services/utilidades.service';
import { COLORES_PAGE, Ubicacion, MUNICIPIO } from '../../interfaces/interfaces';
import { MunicipiosComponent } from '../modals/municipios/municipios.component';
import { DataLocalService } from '../../services/data-local.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header-tabs',
  templateUrl: './header-tabs.component.html',
  styleUrls: ['./header-tabs.component.scss'],
})
export class HeaderTabsComponent implements OnInit {

  @Input() titulo = '';
  @Input() isTab: boolean;
  @Input() isBotones: boolean;
  @Input() isBotonesCompartir: boolean;
  @Input() municipioSeleccionado: Ubicacion;
  @Input() isDetalleEvento: boolean;
  @Output() cambiarMunicipio = new EventEmitter();

  municipio: MUNICIPIO;

  estiloGeneral: COLORES_PAGE = {
    COLOR_BACKGROUND: '',
    COLOR_BACKGROUND_TOOLBAR: '',
    COLOR_BACKGROUND_BOTONES: '',
    COLOR_TEXT_GENERAL: '',
    COLOR_TEXT_BOTONES: ''
  };
  
  constructor(private router: Router,
              private navCtrl: NavController,
              private utilService: UtilidadesService,
              private popoverCtrl: PopoverController,
              private dataLocal: DataLocalService,
              private dataService: DataService) { }

  ngOnInit() {
   /* console.log(this.municipioSeleccionado);
    if (this.municipioSeleccionado === undefined){
      this.dataLocal.getUbicacion().then( (resp: MUNICIPIO) => {
        console.log(resp);
        this.municipioSeleccionado = resp.ubicacion;
        this.titulo = this.municipioSeleccionado.municipio;
      });
    }*/
  }

  cambiarUbicacion(){
   /// if (this.municipioSeleccionado === undefined){
      this.dataLocal.getUbicacion().then(resp => {
        this.municipio = resp;
        this.municipioSeleccionado = resp.ubicacion;
        if (this.municipioSeleccionado !== undefined){
          this.titulo = this.municipioSeleccionado.municipio;
        } else {
          this.titulo = resp.municipio;
          if (this.cambiarMunicipio.asObservable){
            this.cambiarMunicipio.emit();
          }
        }
        
      });
    //}
  }

  gotoInfoMunicipio(){
    this.router.navigate(['/tab-inicio/info-municipios']);
  }

  gotoMap(){
    this.router.navigate(['/tab-inicio/ver-ubicacion']);
  }

  gotoBack() {
    this.navCtrl.pop();
  }

  onClick() {
  }

  compartir() {
    this.utilService.compartir();
  }

  async seleccionarMunicipio(ev: any){
    const popoverLocalidad = await this.popoverCtrl.create({
      component: MunicipiosComponent,
      componentProps: {
         municipioSeleccionado: this.municipioSeleccionado
      },
      cssClass: 'popover-class-municipio',
      event: ev,
      translucent: true,
      mode: 'ios',
    });

    await popoverLocalidad.present();
    const data  = await popoverLocalidad.onDidDismiss();

    console.log(data.data);
    if (data.data !== undefined){
      this.utilService.showLoading();
      this.municipioSeleccionado = data.data;
      this.titulo = this.municipioSeleccionado.municipio;
      
      this.dataService.getMunicipios().subscribe( (munis: MUNICIPIO[]) => {
        this.municipio = munis.filter( muni => muni.ubicacion.municipio === data.data.municipio)[0];
        // this.municipio.miUbicacion = this.latLng;
        this.dataLocal.setUbicacion(this.municipio);
      //  this.utilService.dissmisLoading();
        if (this.cambiarMunicipio.asObservable){
          this.cambiarMunicipio.emit();
        }
      });
    } else{
      
    }
  }
}
