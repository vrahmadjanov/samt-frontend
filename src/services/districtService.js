import districtApi from '../api/districtApi';

function mapDistricts(data) {
  return data.map(d => ({
    value: d.id,
    label: d.name,
  }));
}

const locationDistricts = {
  async getDistricts(language = 'ru') {
    const data = await districtApi.fetchDistricts(language);
    return mapDistricts(data);
  },
};

export default locationDistricts;
