import { Injectable, NgZone } from '@angular/core';
import { Geocode } from '../interfaces/maps-intefaces';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { DataService } from './data.service';

// const apiGoogleMaps = environment.apiGoogleMaps;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  httpOptions: any;
  map: any;
  geocoder: any;

  constructor(private geolocation: Geolocation,
              public loadingCtrl: LoadingController,
              private dataService: DataService,
              private router: Router,
              private ngZone: NgZone) {
    /*this.httpOptions = {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Expose-Headers': 'Content-Length,Content-Range'
      })
  };*/
  }

  /*private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&key=${apiGoogleMaps}`;

  //  console.log('api', query);
    return this.http.get<T>(query, {headers: this.httpOptions});
  }

  getAddress(direccion: string){
    return this.ejecutarQuery<RespuestaMap>(`input=${JSON.stringify(direccion)}`);
  }

  getPlaces() {
    return this.http.get('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAa-8_BfdS2ekOEuwFub2bleOvnoURhfSQ')
          .subscribe (resp => {
            console.log(resp);
          });
  }*/

  async getLocation() {
    const rta = await this.geolocation.getCurrentPosition().then();
    const latLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
    return latLng;
  }

  getWatchLocation() {
    this.geolocation.watchPosition().subscribe(resp => {
      console.log('Position', resp);
    });
  }

  async createMap(mapElement: any, zoom: number, latLng: any) {
    const loading = await this.loadingCtrl.create({
      // message: 'Cargando mapa...'
    });

    loading.present();

    const mapOptions = {
      zoom,
      center: latLng,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(mapElement, mapOptions);
    this.map.addListener('tilesloaded', () => {
      this.addMarker(this.map, latLng);
      loading.dismiss();
    });

    return this.map;
  }
/*
  async createMapProfesionalMarket(mapElement: any, zoom: number, booLoading: boolean, profesionalesDisponibles: Profesional[]) {
    const loading = await this.loadingCtrl.create({
      // message: 'Cargando mapa...'
    });

    if (booLoading) {
      loading.present();
    }

   

    const latLng = await this.getLocation();
    const cLatLng = this.convertLatLng(latLng.lat, latLng.lng);

    const mapOptions = {
      center: cLatLng,
      zoom,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(mapElement, mapOptions);
    this.map.addListener('tilesloaded', () => {
      this.addMarker(this.map, cLatLng);
      this.addProfesionalMarket(this.map, profesionalesDisponibles);
      if (booLoading) {
        loading.dismiss();
      }
    });

    // return this.map;
  }*/

  addMarker(map: any, latlng: any) {
    // tslint:disable-next-line: no-unused-expression
    new CustomMarker(map, null, latlng, this.router, this.ngZone);
  }

  /*addProfesionalMarket(map: any, profesionalesDisponibles: Profesional[]) {
    profesionalesDisponibles.forEach( profesional => {
      const latLng = this.convertLatLng(profesional.geometry.location.lat, profesional.geometry.location.lng);
      // tslint:disable-next-line: no-unused-expression
      new CustomMarker(map, profesional, latLng, this.router, this.ngZone);
    });
  }*/

  convertLatLng(lat: any, lng: any){
    return new google.maps.LatLng(lat, lng);
  }

  getLocationToPlaceId(placeId): Promise<Location> {
    this.geocoder = new google.maps.Geocoder();
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise ( (resolve, reject) => {
      this.geocoder.geocode({placeId}, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            resolve(results[0].geometry.location);
          }
        } else{
          reject(status);
        }
      });
    });
  }

  getPlaceIdToLocation(location: any): Promise<Geocode> {
    //location  = this.convertLatLng(location.lat, location.lng);
    this.geocoder = new google.maps.Geocoder();
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( (resolve, reject) => {
      this.geocoder.geocode({location}, (results: any, status: any) => {
        console.log(results);
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            resolve(results[1]);
          } else  {
            resolve(results[0]);
          }
        } else {
          reject(status);
        }
      });
    });
  }
}

/* Class marker */

class CustomMarker extends google.maps.OverlayView {
  marker: any;
  clickListener: any;

  constructor(private map, private profesional, private latLng: any, router: Router, private ngZone: NgZone) {
    super();
    this.latlng = latLng;
    this.profesional = profesional;
    this.router = router;
    this.ngZone = ngZone;
    this.setMap(map);
  }

  draw() {
    if (!this.marker) {
      const width = this.profesional !== null ? this.profesional.properties.iconSize[0] : 40;
      const heigth = this.profesional !== null ? this.profesional.properties.iconSize[1] : 40;
      const image = this.profesional !== null ? this.profesional.properties.image : '/assets/logo/logo80-01.svg';

      this.marker = document.createElement('div');
      this.marker.className = this.profesional !== null ? 'marker sin-color' : 'marker color';
      this.marker.style.width = width + 'px';
      this.marker.style.height = heigth + 'px';

      const img = document.createElement('img');
      img.src = image;
      img.style.width = (width - 4) + 'px';
      img.style.height = (heigth - 4) + 'px';
      this.marker.appendChild(img);

      if (this.profesional !== null) {
        this.clickListener = google.maps.event.addDomListener(this.marker, 'click', (event) => {
          this.ngZone.run(() => {
            this.router.navigate(['/perfil-profesional'], {
              queryParams: {
                perfilProfesional: JSON.stringify(this.profesional)
              }
            });
          });
        });
      }

      const panes = this.getPanes();
      panes.overlayImage.appendChild(this.marker);
    }

    const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
    if (point) {
      this.marker.style.left = (point.x - 19.8) + 'px';
      this.marker.style.top = (point.y - 50) + 'px';
    }
  }

  remove() {
    if (this.marker) {
      this.marker.parentNode.removeChild(this.marker);
      this.clickListener.remove();
      this.marker = null;
    }
  }

  getPosition() {
    return this.latlng;
  }

  getDraggable() {
    return false;
  }
}

