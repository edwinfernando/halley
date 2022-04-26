import { Component, OnInit } from '@angular/core';
import { ZonaMunicipios, COLORES_PAGE, Ubicacion } from '../../../interfaces/interfaces';
import { NavParams, PopoverController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.scss'],
})
export class MunicipiosComponent implements OnInit {

  zonaMunicipios: ZonaMunicipios[];
  municipioSeleccionado: Ubicacion;

  estiloGeneral: COLORES_PAGE = {
    COLOR_BACKGROUND: '',
    COLOR_BACKGROUND_TOOLBAR: '',
    COLOR_BACKGROUND_BOTONES: '',
    COLOR_TEXT_GENERAL: '',
    COLOR_TEXT_BOTONES: ''
  };

  constructor(//private dataLocal: DataLocalService,
              private navParam: NavParams,
              private dataService: DataService,
              private popCtrl: PopoverController) { }

  ngOnInit() {
    /*this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
      }
    });*/

    this.municipioSeleccionado = this.navParam.get('municipioSeleccionado');

    this.dataService.getZonaMunicipios().subscribe( resp => {
      this.zonaMunicipios = resp;
      this.zonaMunicipios.forEach(listItem => {
        listItem.expanded = false;
      });

    });

  }

  iconDetail(zona: ZonaMunicipios){
    if (zona.municipios.length > 0){
      if (zona.expanded){
        return 'chevron-up-outline';
      } else{
        return 'chevron-down-outline';
      }
    }else {
      return '';
    }
  }

  lines(zona: ZonaMunicipios){
    if (zona.expanded){
      return 'none';
    } else{
      return 'inset';
    }
  }

  seleccionaMunicipio(municipio: Ubicacion){
    this.municipioSeleccionado = municipio;
    this.popCtrl.dismiss(this.municipioSeleccionado);
  }

  onClickSilla(zona: ZonaMunicipios) {
    if (zona.municipios.length > 0){
      if (zona.expanded) {
        zona.expanded = false;
      } else {
        this.zonaMunicipios.forEach(listItem => {
          if (zona === listItem) {
            listItem.expanded = !listItem.expanded;
          } else {
            listItem.expanded = false;
          }
          return listItem;
        });
      }
    } else {
      this.popCtrl.dismiss(zona);
    }
  }
}
