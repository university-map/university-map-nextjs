import { LatLngTuple } from "leaflet";

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

export { Location, UniversityLocation };