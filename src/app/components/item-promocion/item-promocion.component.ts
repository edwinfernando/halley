import { Component, Input, OnInit } from '@angular/core';
import { Promocion } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { PromocionComponent } from '../modals/promocion/promocion.component';
import { UtilidadesService } from '../../services/utilidades.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-item-promocion',
  templateUrl: './item-promocion.component.html',
  styleUrls: ['./item-promocion.component.scss'],
})
export class ItemPromocionComponent implements OnInit {

  @Input() promocion: Promocion;
  constructor(private modalService: ModalService,
              private utilService: UtilidadesService) { }

  ngOnInit() {
    console.log(this.promocion);
  }

  onClick(ev: any) {
    this.modalService.showModalPromocion(this.promocion, ev);
  }

  formatearValor(valor: any){
    return UtilidadesService.formatearNumeroMonedaDecimas(valor);
  }
}
