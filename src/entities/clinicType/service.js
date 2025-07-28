import { fetchClinicTypes } from './api';

class ClinicTypeService {
  async getClinicTypes() {
    try {
      const clinicTypes = await fetchClinicTypes();
      return clinicTypes;
    } catch (error) {
      console.error('Error fetching clinic types:', error);
      return [];
    }
  }
}

const clinicTypeService = new ClinicTypeService();
export default clinicTypeService; 