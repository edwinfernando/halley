import { Component, OnInit, Input } from '@angular/core';
import { Carta } from '../../interfaces/interfaces';
import { UtilidadesService } from '../../services/utilidades.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss'],
})
export class CartaComponent implements OnInit {

  @Input() carta: Carta[];
  constructor() { }

  ngOnInit() {}

  formatearValor(valor: any){
    return UtilidadesService.formatearNumeroMonedaDecimas(valor);
  }
}
