import { fetchLanguages } from './api';

export const mapLanguages = (data) =>
  Array.isArray(data)
    ? data.map((item) => ({ value: item.id, label: item.name }))
    : [];

const languageService = {
  async getLanguages() {
    const data = await fetchLanguages();
    return mapLanguages(data);
  },
};

export default languageService;


