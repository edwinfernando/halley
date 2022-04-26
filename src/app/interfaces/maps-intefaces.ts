export interface Geocode {
  address_components: Addresscomponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
}

export interface Location {
  lat: number;
  lng: number;
}

interface Bounds {
  south: number;
  west: number;
  north: number;
  east: number;
}

interface Addresscomponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}
