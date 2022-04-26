import { Component, OnInit, Input } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-emergencias',
  templateUrl: './emergencias.component.html',
  styleUrls: ['./emergencias.component.scss'],
})
export class EmergenciasComponent implements OnInit {

  @Input() numerosEmergencia: [];
  
  constructor(private popoverCtrl: PopoverController,
              private callNumber: CallNumber) { }

  ngOnInit() {
    console.log(this.numerosEmergencia);
  }

  closeModal(){
    this.popoverCtrl.dismiss();
  }

  onClickLlamar(tel_number: string){
    window.open(`tel:${tel_number}`, '_system');
    this.callNumber.callNumber('3137649407', true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
  }
}
