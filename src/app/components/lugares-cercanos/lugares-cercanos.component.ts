import { Component, OnInit, Input } from '@angular/core';
import { LugarCercanos } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-lugares-cercanos',
  templateUrl: './lugares-cercanos.component.html',
  styleUrls: ['./lugares-cercanos.component.scss'],
})
export class LugaresCercanosComponent implements OnInit {

  @Input() lugares: LugarCercanos[];
  slideOpts = {
    slidesPerView: 3.1,
    freeMode: true
  };
  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    if (this.lugares.length <= 3){
      this.slideOpts.slidesPerView = 3;
    } else {
      this.slideOpts.slidesPerView = 3.1;
    }
  }

  onClick(id: any){
    this.dataService.getServiciosPorId(id).subscribe( resp => {
      this.router.navigate(['tab-inicio/eventos-detalle'],
        {
          queryParams: {
            servicio: JSON.stringify(resp[0])
          },
          replaceUrl: true
        });
    });
  }
}
