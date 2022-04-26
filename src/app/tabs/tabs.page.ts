import { Component, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonTabs, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('myTabs') tabsMenu: IonTabs;
  tabSelect = 'tab';
  tabSelectAnt = '';
  tabs: any [] = [
    {tab: 'tab-inicio', icon: 'home-outline', label: 'Inicio'},
   /* {tab: 'tab-buscar', icon: 'search-outline', label: 'Buscar'},
    {tab: 'tab-promociones', icon: 'megaphone-outline', label: 'Qr'},
    {tab: 'tab-favoritos', icon: 'heart-outline', label: 'Favoritos'},*/
    {tab: 'tab-contactenos', icon: 'people-outline', label: 'Contactos'}
  ];
  constructor(private barcodeScanner: BarcodeScanner,
              private navCtrl: NavController) {}

  ionTabsWillChange(event) {
    if (event.tab !== 'tab-qr'){
      this.tabSelect = event.tab;
      console.log(this.tabSelect);
    }
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if (!barcodeData.cancelled) {
       //  this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
       this.tabsMenu.select('tab-inicio');
      }else {
        // this.tabsMenu.select(this.tabSelect);
        this.navCtrl.navigateBack('/tabs/' + this.tabSelect);
      }
     }).catch(err => {
        console.log('Error', err);
        this.tabsMenu.select(this.tabSelect);
        // this.dataLocal.guardarRegistro('QRCode', 'https://google.com');
          // this.dataLocal.guardarRegistro('QRCode', 'geo:40.71382463110316,-73.97847547968753');
     });
  }

  onClick(event){
    if (event.tab === 'tab-inicio'){
     // this.scan();
    }
  }
}
