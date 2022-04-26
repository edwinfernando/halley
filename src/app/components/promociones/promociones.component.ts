import { Component, OnInit, Input } from '@angular/core';
import { Promocion } from '../../interfaces/interfaces';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
})
export class PromocionesComponent implements OnInit {

  @Input() lPromociones: Promocion[];
  slideOpts = {
    slidesPerView: 1.2,
    freeMode: true
  };
  constructor() { }

  ngOnInit() {

    console.log(this.lPromociones);
    if (this.lPromociones.length <= 1){
      this.slideOpts.slidesPerView = 1;
    } else {
      this.slideOpts.slidesPerView = 1.2;
    }
  }

}
