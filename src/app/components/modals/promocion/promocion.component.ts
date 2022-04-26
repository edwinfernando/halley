import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Promocion, SILLAS } from '../../../interfaces/interfaces';
import { UtilidadesService } from '../../../services/utilidades.service';
import { IonSlides, PopoverController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.scss'],
})
export class PromocionComponent implements OnInit {

  @ViewChild('ionSlides') ionSlides: IonSlides;
  @Input() promocion: Promocion;
  valor: any;
  click: any;
  titulo: any;
  subtitulo: any;
  etqBoton: any;
  estrella = 'heart-outline';

  slideOpts = {
    slidesPerView: 1,
    freeMode: true
  };

  estiloBotones = {
    COLOR_BACKGROUND_B_ACCESO: '#22b573',
    COLOR_TEXT: '#FFFFFF'
  };

  sillas: SILLAS[] = [];
  numeroSillas = 0;
  fila: any = [];
  columna: any = [];
  
  constructor(private utilService: UtilidadesService,
              private popoverCtrl: PopoverController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.promocion);
    this.etqBoton = 'Solicitar';
    this.click = this.promocion.clicks;
    if (this.promocion.clicks > 0){
      this.valor = this.promocion.price / this.promocion.clicks;
    } else {
      this.valor = this.promocion.price;
    }

    this.cambiarEtiqueta();

    for (let index = 0; index <= 9; index++) {
      this.fila.push(index);
    }

    for (let index = 0; index <= 9; index++) {
      this.columna.push(index);
    }

    console.log(this.fila);
    // this.getNumeroSillas();
  }

  ionViewDidEnter(){
    this.ionSlides.update();
  }

  closeModal() {
    this.promocion.clicks = this.click;
    this.promocion.price = this.valor;
    if(this.promocion.isRifa){
      this.modalCtrl.dismiss();
    }else{
      this.popoverCtrl.dismiss();
    }
    
  }

  favorito() {
  //  this.isFavorito = this.dataLocal.guardarServicio(this.servicio);
  //  this.estrella = (this.isFavorito) ? 'heart' : 'heart-outline';
  }

  compartir() {
    this.utilService.compartir();
  }

  formatearValor(valor: number){
    return UtilidadesService.formatearNumeroMonedaDecimas(valor);
  }

  nClickServicios(){
    if (this.promocion.clicks > 0) {
      return true;
    } else {
      return false;
    }
  }

  sumarClick() {
    if (this.promocion.clicks < 9) {
      this.promocion.clicks = this.promocion.clicks + 1;
      // this.actualizaLServiciosPendientes(true);
      this.cambiarEtiqueta();
    }
  }

  restarClick() {
    if (this.promocion.clicks > 1) {
      this.promocion.clicks = this.promocion.clicks - 1;
      this.promocion.price -= this.valor;
    }
   // this.actualizaLServiciosPendientes(false);
    this.cambiarEtiqueta();
  }

  cambiarEtiqueta() {
    if (this.promocion.clicks > 0) {
      this.subtitulo = this.promocion.name;
      this.promocion.price = this.valor * this.promocion.clicks;
      this.titulo = this.formatearValor(this.promocion.price);
    } else {
      this.titulo = this.promocion.name;
      this.subtitulo = this.formatearValor(this.promocion.price);
    }
  }

  onClickAgregar() {
    if(this.promocion.isRifa){
      this.modalCtrl.dismiss();
    }else{
      this.popoverCtrl.dismiss();
    }
  }

  next() {
    console.log('slide');
    this.ionSlides.slideNext();
  }

  prev() {
    this.ionSlides.slidePrev();
  }

  /*** boleteria */
  seleccionaSilla(){
    this.popoverCtrl.dismiss(this.sillas);
    // this.modalCtrl.dismiss(this.sillas);
  }

  onClickSilla(a: number, b: number){
    this.getNumeroSillas();
    const lengthFila = this.fila.length - 1;
    const silla = (lengthFila * b) + (a + b);

    if (this.numeroSillas < 10){
      this.sillas[silla].selected = !this.sillas[silla].selected;
    } else {
      this.sillas[silla].selected = false;
    }
  }

  sillaIsSelected(a: number, b: number){
    const lengthFila = this.fila.length - 1;
    const silla = (lengthFila * b) + (a + b);
    return this.sillas[silla].selected;
  }

  sillaEstado(a: number, b: number){
    const lengthFila = this.fila.length - 1;
    const silla = (lengthFila * b) + (a + b);
    if (this.sillas[silla].silla.silleteriaEstado === 73){
      return false;
    }else {
      return true;
    }
  }

  sillaHabilitar(a: number, b: number){
    const lengthFila = this.fila.length - 1;
    const silla = (lengthFila * b) + (a + b);
    if (this.sillas[silla].silla.silleteriaEstado !== 45){
      return true;
    }else {
      return false;
    }
  }

  getNumeroSillas(){
    this.numeroSillas = 0;
    this.sillas.forEach( silla => {
      if (silla.selected) {
        this.numeroSillas += 1;
      }
    });
  }
}
