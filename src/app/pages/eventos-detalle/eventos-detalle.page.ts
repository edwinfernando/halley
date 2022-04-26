import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio, LugarCercanos, Promocion, DetalleServicio, MUNICIPIO } from '../../interfaces/interfaces';
import { ModalService } from '../../services/modal.service';
import { DataService } from '../../services/data.service';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-eventos-detalle',
  templateUrl: './eventos-detalle.page.html',
  styleUrls: ['./eventos-detalle.page.scss'],
})
export class EventosDetallePage implements OnInit {

  detalleServicio: DetalleServicio = {
    tipo: '',
    detalleServicio: null,
    contactar: null,
    servicios: [],
    horario: null,
    promociones: null,
    carta: null,
    lugaresCercanos: null,
    opiniones: null
  };
  idServicio: string;
  min: string;
  km: string;
  titulo = '';
  subtitulo = 'Santander de Quilichao';
  maxLength = 300;

  constructor(private activeRoute: ActivatedRoute,
              private modalService: ModalService,
              private dataService: DataService,
              private dataLocal: DataLocalService,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(resp => {
      this.idServicio = JSON.parse(resp.idServicio);
      this.min = JSON.parse(resp.min);
      this.km = JSON.parse(resp.km);
      this.consultarDetalle();
    });

    this.dataLocal.getUbicacion().then( (resp: MUNICIPIO) => {
      this.subtitulo = resp.nombre;
    });
  }

  consultarDetalle(){
    this.dataService.getDetalleServicios().subscribe( (resp: DetalleServicio[]) => {
      this.detalleServicio = resp.filter( serv => serv.detalleServicio.id === this.idServicio)[0];
      this.detalleServicio.detalleServicio.min = this.min;
      this.detalleServicio.detalleServicio.km = this.km;
      this.titulo = this.detalleServicio.detalleServicio.nombre;

      console.log(this.detalleServicio);
    });
  }

  onClickLlamar(ev: any){
    this.modalService.showModalContactar(this.detalleServicio.contactar, ev);
  }

  onClickVerMapa(){
    this.router.navigate(['tab-inicio/ver-mapa'], {
      queryParams: {
        location: JSON.stringify(this.detalleServicio.detalleServicio.ubicacion.location),
        titulo: this.titulo
      }
    });
  }

  recortarCadena(cadena: string){
    if (this.descripcionLength(cadena)) {
      return cadena.substring(0, this.maxLength) + '...';
    } else {
      return cadena;
    }
   
  }

  descripcionLength(cadena: string){
    return cadena.length > this.maxLength;
  }

  onClickModalVerMas(titulo: string, ev: any, contenido: string){
    this.modalService.showModalVerMas(titulo, contenido, ev);
  }

  sendMessage(){}
}
