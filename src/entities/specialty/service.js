import specialtyApi from './api';

export const mapSpecialties = (data) =>
  data.map((item) => ({
    id: item.id,
    name: item.name,
    icon: item.icon,
  }));

const specialtyService = {
  async getSpecialties() {
    const data = await specialtyApi.fetchSpecialties();
    return mapSpecialties(data);
  },
};

export default specialtyService; 