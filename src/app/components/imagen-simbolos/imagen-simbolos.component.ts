import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagen-simbolos',
  templateUrl: './imagen-simbolos.component.html',
  styleUrls: ['./imagen-simbolos.component.scss'],
})
export class ImagenSimbolosComponent implements OnInit {

  @Input() imagenSimbolo = {
    type: '',
    url: ''
  };
  constructor() { }

  ngOnInit() {}

}
