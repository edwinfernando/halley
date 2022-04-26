import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Servicio, Categoria, Promocion, ZonaMunicipios, MUNICIPIO, DetalleServicio } from '../interfaces/interfaces';

// const URL = environment.url;
const LNG_KEY = 'SELECTED_LANGUAGE';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions: any;
  userId: any;
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };

  }

  getServicios() {
    return this.httpClient.get<Servicio[]>('/assets/data/servicios.json');
  }

  getServiciosPorId(idLugar: any) {
    return this.httpClient.get<Servicio[]>('/assets/data/servicios.json');
  }

  getDetalleServicios() {
    return this.httpClient.get<DetalleServicio[]>('/assets/data/detalleServicio.json');
  }

  getCategorias() {
    return this.httpClient.get<Categoria[]>('/assets/data/categorias.json');
  }

  getPromociones() {
    return this.httpClient.get<Promocion[]>('/assets/data/promociones.json');
  }

  getZonaMunicipios() {
    return this.httpClient.get<ZonaMunicipios[]>('/assets/data/municipiosVoytu.json');
  }

  getMunicipios() {
    return this.httpClient.get<MUNICIPIO[]>('/assets/data/municipios.json');
  }
}
