import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from '../../interfaces/interfaces';

@Component({
  selector: 'app-item-servicio',
  templateUrl: './item-servicio.component.html',
  styleUrls: ['./item-servicio.component.scss'],
})
export class ItemServicioComponent implements OnInit {

  @Input() servicio: Servicio;
  @Input() isFocused = false;
  constructor(private router: Router) { }

  ngOnInit() {}

  recortarCadena(cadena: string){
    return cadena.substring(0, 60) + '...';
  }

  onClick() {
    this.router.navigate(['tab-inicio/eventos-detalle'],
    {
      queryParams: {
        idServicio: JSON.stringify(this.servicio.id),
        min: JSON.stringify(this.servicio.min),
        km: JSON.stringify(this.servicio.km)
      }
    });
  }

  focusFunction(){
    this.isFocused = true;
    console.log("Mouse" + this.servicio.id);
  }

  focusOutFunction(){
    this.isFocused = false;
    console.log("Mouse out" + this.servicio.id);
  }
}
