import experienceApi from './api';

export const mapExperienceLevels = (data) =>
  data.map((item) => ({
    id: item.id,
    name: item.level,
  }));

const experienceService = {
  async getExperienceLevels() {
    const data = await experienceApi.fetchExperienceLevels();
    return mapExperienceLevels(data);
  },
};

export default experienceService; 