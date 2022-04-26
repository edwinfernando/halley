import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.scss'],
})
export class VerMasComponent implements OnInit {

  image = '';
  titulo = '';
  contenido: any;
  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
    if(this.titulo === 'Ubicación') {
      this.contenido = this.contenido.split("/n");
      console.log(this.contenido);
    }
  }

  closeModal(){
    this.popoverCtrl.dismiss();
  }
}
