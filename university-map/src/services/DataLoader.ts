import yaml from 'js-yaml';
import { Location, UniversityLocation, UniversityInfo } from './models';

interface IDataLoader {
  loadData(filePath: string): Promise<any>;
  getUnivLocations(): Promise<UniversityLocation[]>
  getUnivInfo(country: string, university: string, language: string): Promise<UniversityInfo>
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
        return new UniversityLocation(
          univ.name,
          univ.country,
          locations
        );
      });
      return universities;
    } catch (error) {
      console.error('Error loading locations:', error);
      return Promise.resolve([]);
    }
  }

  public async getUnivInfo(
    country: string = 'Taiwan',
    university: string = 'National Cheng Kung University',
    language: string = 'zh-TW'): Promise<UniversityInfo> {
    try {
      const response = await fetch(`universities/${country}/${university}/${language}.yml`)
      const data = yaml.load(await response.text()) as any;
      return new UniversityInfo(
        data.language,
        data.name,
        data.address,
        data.introduction,
        data.gallery
      );
    } catch (error) {
      console.error('Error loading university info:', error);
      return Promise.resolve(new UniversityInfo('', '', '', '', []));
    }
  }
}

export default DataLoader;