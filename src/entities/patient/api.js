import httpClient from '../../shared/utils/httpClient';

export const patientAPI = {
  // Получение профиля пациента
  getMyProfile: () => httpClient.get('/patients/my-profile/'),
  
  // Обновление профиля пациента
  updateMyProfile: (data) => httpClient.patch('/patients/my-profile/', data),
  
  // Загрузка фотографии профиля
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    return httpClient.patch('/patients/my-profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}; 