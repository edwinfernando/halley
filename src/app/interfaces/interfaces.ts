export interface Categoria {
    id: string;
    name: string;
}

export interface LugarCercanos {
    id: string;
    name: string;
    imagen: string;
}

export interface Promocion {
    id: string;
    placeId: string;
    namePlace: string;
    categoria: string;
    name: string;
    price: number;
    imagen: string[];
    description: string;
    clicks: number;
    isRifa: boolean;
}

/** COLORES */
export interface COLORES_PAGE {
    COLOR_BACKGROUND: string;
    COLOR_BACKGROUND_TOOLBAR: string;
    COLOR_BACKGROUND_BOTONES: string;
    COLOR_TEXT_GENERAL: string;
    COLOR_TEXT_BOTONES: string;
}

/** BOLETERIA */
export interface SILLETERIA{
    silleteriaColumna: number;
    silleteriaEscenario: number;
    silleteriaEstado: number;
    silleteriaFila: number;
    silleteriaId: number;
    silleteriaNombre: string;
    silleteriaZona: number;
  }
  
export interface SILLAS {
    silla: SILLETERIA;
    selected: boolean;
}

/** EVENTO PRINCIPAL */
export interface MUNICIPIO {
  codigo: string;
  nombre: string;
  departamento: string;
  cargo: string;
  alcalde: string;
  periodo: string;
  fundacion: string;
  ereccion: string;
  superficie: string;
  altitud: string;
  poblacion: string;
  densidad: string;
  urbano: string;
  gentilicio: string;
  descripcion: string;
  historia: string;
  economia: string;
  cultura: string;
  himno: string;
  url: string;
  colorPredominante: string;
  ubicacion: Ubicacion;
  miUbicacion: Location;
  imagenes: Imagene[];
  imagenSimbolos: ImagenSimbolo[];
  numerosEmergencia: NumerosEmergencia[];
}

export interface NumerosEmergencia {
  nombre: string;
  numero: string;
  color: string;
}

export interface ImagenSimbolo {
  tipo: string;
  url: string;
}

export interface Imagene {
  tipo: string;
  url: string;
}

export interface Ubicacion {
  codigo: string;
  placeId: string;
  location: Location;
  direccion: string;
  municipio: string;
  departamento: string;
  isChecked: boolean;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface ZonaMunicipios {
    id: string;
    nombre: string;
    municipios: Ubicacion[]; 
    expanded: boolean;
}

export interface TodosServicios {
  numServicios: number;
  nombreCategoria: string;
  servicios: Servicio[];
}

export interface Servicio {
    id: string;
    imagenes: ImagenSimbolo[];
    nombre: string;
    descripcion: string;
    categoria: string;
    ubicacion: Ubicacion;
    km: string;
    min: string;
}

export interface DetalleServicio {
  tipo: string;
  detalleServicio: Servicio;
  contactar: Contactar[];
  servicios: string[];
  horario: [{
    detalle: string;
    hora: string;
  }];
  carta: Carta[];
  promociones: Promocion[];
  lugaresCercanos: LugarCercanos;
  opiniones: string[];
}

export interface Contactar {
  logo: string;
  color: string;
  tipo: string;
  nombre: string;
  descripcion: string;
}

export interface Carta {
  id: string;
  name: string;
  imagen: string;
  price: number;
  description: string;
}

