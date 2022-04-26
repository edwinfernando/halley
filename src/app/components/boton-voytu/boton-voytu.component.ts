import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';

@Component({
  selector: 'app-boton-voytu',
  templateUrl: './boton-voytu.component.html',
  styleUrls: ['./boton-voytu.component.scss'],
})
export class BotonVoytuComponent implements OnInit {

  constructor(private route: Router,
              private utilService: UtilidadesService) { }

  ngOnInit() {}

  async onClick() {
    this.utilService.showLoading();
    this.route.navigate(['tab-inicio/eventos'], {
      queryParams: {
      }
    });
  }
}
