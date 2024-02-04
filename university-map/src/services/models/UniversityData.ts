import { LatLngTuple } from "leaflet";

// public/universities/locations.json
class Location {
  constructor(
    public name: string,
    public coordinates: LatLngTuple
  ) {}
}

class UniversityLocation {
  constructor(
    public name: string,
    public country: string,
    public locations: Location[]
  ) {}
}

// public/universities/{country}/{university}/{language}.yml
class UniversityInfo {
  constructor(
    public language: string,
    public name: string,
    public address: string,
    public introduction: string,
    public gallery: string[],
  ) {}
}

export { Location, UniversityLocation, UniversityInfo };