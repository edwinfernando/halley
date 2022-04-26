import { Injectable } from '@angular/core';
import { MUNICIPIO, Servicio } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  servicios: Servicio[] = [];

  constructor(private storage: Storage,
              private toastController: ToastController) {
                this.cargarFavoritos();
              }

  /*+++++++SERVICIOS FAVORITOS+++++++++*/
  guardarServicio(servicio: Servicio) {
    let existe = false;
    let mensaje = '';

    for (const serv of this.servicios) {
      if (serv.id === servicio.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.servicios = this.servicios.filter ( serv => serv.id !== servicio.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.servicios.push(servicio);
      mensaje = 'Agregada a favoritos';
    }

    // this.presentToast(mensaje);
    this.storage.set('servicios', this.servicios);

    return !existe;
  }

  async cargarFavoritos() {
    const servicios = await this.storage.get('servicios');
    this.servicios = servicios || [];
    return this.servicios;
  }

  async existeServicio(id) {
    await this.cargarFavoritos();
    const existe = this.servicios.find( serv => serv.id === id);

    return (existe) ? true : false;
  }

  setUbicacion(direccion: MUNICIPIO) {
    this.storage.set('ubicacion', direccion);
  }

  async getUbicacion() {
    const ubicacion = await this.storage.get('ubicacion');
    return ubicacion;
  }

}
