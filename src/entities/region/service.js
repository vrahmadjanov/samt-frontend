import { fetchRegions } from './api';

class RegionService {
  async getRegions() {
    try {
      const regions = await fetchRegions();
      return regions;
    } catch (error) {
      console.error('Error fetching regions:', error);
      return [];
    }
  }
}

const regionService = new RegionService();
export default regionService; 