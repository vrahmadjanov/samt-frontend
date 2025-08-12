import { fetchServicePlaces } from './api';

export const mapServicePlaces = (data) =>
  Array.isArray(data)
    ? data.map((item) => ({ value: item.id, label: item.name }))
    : [];

const servicePlaceService = {
  async getServicePlaces() {
    const data = await fetchServicePlaces();
    return mapServicePlaces(data);
  },
};

export default servicePlaceService;


