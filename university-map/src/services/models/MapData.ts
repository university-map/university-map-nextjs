class Location {
  constructor(public name: string, public coordinates: number[]) {}
}

class UniversityLocation {
  constructor(public name: string, public country: string, public locations: Location[]) {}
}

export { Location, UniversityLocation };