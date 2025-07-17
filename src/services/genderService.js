import genderApi from '../api/genderApi';

function mapGenders(data) {
  return data.map(g => ({
    value: g.id,
    label: g.name,
  }));
}

const locationGenders = {
  async getGenders(language = 'ru') {
    const data = await genderApi.fetchGenders(language);
    return mapGenders(data);
  },
};

export default locationGenders;
