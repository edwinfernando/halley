import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root'
})

export class UtilidadesService {
  
  isLoading = false;

  constructor(private socialShare: SocialSharing,
              private loadingCtrl: LoadingController) { }

  public static formatearNumeroMonedaDecimas(valor: any) {
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    let valorFormato: any;
    if (valor !== '') {
      valorFormato = numberFormat.format(valor);
      valorFormato = valorFormato.split('.');
      valorFormato = valorFormato[0].replace(',', '.'); // + ',' + valorFormato[1];
    }
    return valorFormato;
  }

  compartir() {
    this.socialShare.share('Esto es Woaho');
  }

  maskString(inputTxt) {
    inputTxt = this.maskInputString(inputTxt);
    inputTxt = inputTxt[inputTxt.length - 1];
    return inputTxt;
  }

  maskInputString(inputTxt) {
    inputTxt = inputTxt.replace(/\D/g, '');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    return inputTxt;
  }

  maskInputFecha(inputTxt){
    if (inputTxt !== ''){
      if (inputTxt === '00'){
        return '';
      } else {
        if (inputTxt !== '0' && inputTxt !== '1' && inputTxt.length < 2){
          inputTxt = '0' + inputTxt + '/';
          inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1/$2');
        }
        // inputTxt = inputTxt.replace(/\D/g, '');
        inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1/$2');
        inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1 $2');
      }

      return inputTxt;
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      mode: 'ios',
      translucent: true,
     // message: this.loadingText
    });

    if (!this.isLoading) {
      this.isLoading = true;
      loading.present();
    }
  }

  dissmisLoading(){
    if (this.isLoading)
      this.loadingCtrl.dismiss();
  }
}
