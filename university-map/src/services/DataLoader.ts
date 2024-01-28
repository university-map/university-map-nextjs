import yaml from 'js-yaml';

interface IDataLoader {
  loadData(filePath: string): Promise<any>;
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

  public async getUniversityIndex(country: string) {

  }
}

export default DataLoader;