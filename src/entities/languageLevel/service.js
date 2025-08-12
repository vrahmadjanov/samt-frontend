import { fetchLanguageLevels } from './api';

export const mapLanguageLevels = (data) =>
  Array.isArray(data)
    ? data.map((item) => ({ value: item.id, label: item.level }))
    : [];

const languageLevelService = {
  async getLanguageLevels() {
    const data = await fetchLanguageLevels();
    return mapLanguageLevels(data);
  },
};

export default languageLevelService;


