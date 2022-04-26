import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonSlides } from '@ionic/angular';
import { Imagene } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slide-imagenes',
  templateUrl: './slide-imagenes.component.html',
  styleUrls: ['./slide-imagenes.component.scss'],
})
export class SlideImagenesComponent implements OnInit {

  @Input() imagenes: Imagene[];
  @ViewChild('ionSlides') ionSlides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    autoplay: false,
    speed: 2000,
    spaceBetween: 0,
    autoHeight: true,
    roundLengths: true,
    preloadImages: true,
    updateOnImagesReady: true,
    centeredSlides: true,
  };

  vidUrl: SafeResourceUrl;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() { 
  }

  getUrlVideo(url: string){
    url = url.replace('watch?v=', 'embed/');
    this.vidUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    return this.vidUrl;
  }

  next() {
    this.ionSlides.slideNext();
  }

  prev() {
    this.ionSlides.slidePrev();
  }
}
