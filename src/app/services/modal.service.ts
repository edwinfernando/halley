import { Injectable } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { VerMasComponent } from '../components/modals/ver-mas/ver-mas.component';
import { ContactarComponent } from '../components/modals/contactar/contactar.component';
import { Servicio, Promocion, Contactar } from '../interfaces/interfaces';
import { PromocionComponent } from '../components/modals/promocion/promocion.component';
import { EmergenciasComponent } from '../components/modals/emergencias/emergencias.component';



@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalCtrl: ModalController,
              private popoverCtrl: PopoverController) { }

  async openModal(component: any, openModal: any) {
    const modal = await this.modalCtrl.create({
      component,
      cssClass: 'custom-modal',
      componentProps: {
        openModal
      },
      mode: 'ios'
    });

    await modal.present();
    modal.onDidDismiss().then(data => {
      if (data.data !== undefined) {
        return data.data.nombre;
      }
    });
  }

  async showModalVerMas(titulo: string, contenido: string, ev: any) {
    const popover = await this.popoverCtrl.create({
      component: VerMasComponent,
      componentProps: {
        titulo,
        contenido
      },
      cssClass: 'popover-class',
      event: ev,
      translucent: true,
      mode: 'ios',
      backdropDismiss: false
    });

    await popover.present();
    const data  = await popover.onDidDismiss();

    return data;
  }

  async showModalContactar(contactar: Contactar[], ev: any) {
    const popover = await this.popoverCtrl.create({
      component: ContactarComponent,
      componentProps: {
        contactar
      },
      cssClass: 'popover-class',
      event: ev,
      translucent: true,
      mode: 'ios',
    });

    await popover.present();
    const data  = await popover.onDidDismiss();
  }

  async showModalPromocion(promocion: Promocion, ev: any){
    if (promocion.isRifa) {
      const modal = await this.modalCtrl.create({
        component: PromocionComponent,
        cssClass: 'custom-modal',
        componentProps: {
          promocion
        },
        mode: 'ios'
      });
  
      await modal.present();
      const data  = await modal.onDidDismiss();
    } else {
      const popover = await this.popoverCtrl.create({
        component: PromocionComponent,
        componentProps: {
          promocion
        },
        cssClass: 'popover-class',
        event: ev,
        translucent: true,
        mode: 'ios',
      });
  
      await popover.present();
      const data  = await popover.onDidDismiss();
    }
  }

  async showModalEmergencia(numerosEmergencia: any[], ev: any) {
    const popover = await this.popoverCtrl.create({
      component: EmergenciasComponent,
      componentProps: {
        numerosEmergencia
      },
      cssClass: 'popover-class',
      event: ev,
      translucent: true,
      mode: 'ios',
    });

    await popover.present();
    const data  = await popover.onDidDismiss();
  }
}
