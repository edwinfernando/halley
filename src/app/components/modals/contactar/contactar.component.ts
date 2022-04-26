import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Contactar } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-contactar',
  templateUrl: './contactar.component.html',
  styleUrls: ['./contactar.component.scss'],
})
export class ContactarComponent implements OnInit {

  @Input() contactar: Contactar[];
  constructor(private popoverCtrl: PopoverController,
              private callNumber: CallNumber) { }

  ngOnInit() {}

  closeModal(){
    this.popoverCtrl.dismiss();
  }

  onClickContactar(contact: Contactar){
    if (contact.tipo === "cel") {
      this.callNumber.callNumber(contact.descripcion, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }else {
      
    }
   
  }
}
