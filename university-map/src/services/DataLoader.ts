import yaml from 'js-yaml';
import { Location, UniversityLocation } from './models';

interface IDataLoader {
  loadData(filePath: string): Promise<any>;
  getUnivLocations(): Promise<UniversityLocation[]>
}

class DataLoader implements IDataLoader {
  private static instance: DataLoader | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  public async loadData(filePath: string): Promise<any> {
    try {
      const response = await fetch(filePath);
      const data = await response.text();
      return yaml.load(data);
    } catch (error) {
      console.error('Error loading YAML file:', error);
      return null;
    }
  }

  public async getUnivLocations(): Promise<UniversityLocation[]> {
    try {
      const response = await fetch('universities/locations.json');
      const data = await response.json();
      const universities: UniversityLocation[] = data.map((univ: any) => {
        const locations: Location[] = univ.location.map((loc: any) => new Location(loc.name, loc.coordinates));
        return new UniversityLocation(univ.name, univ.country, locations);
      });

      console.log(universities);
      return universities;
    } catch (error) {
      console.error('Error loading locations file:', error);
      return Promise.resolve([]);
    }
  }
}

export default DataLoader;