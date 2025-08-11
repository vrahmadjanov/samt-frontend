import { createApiClient } from '../../shared/utils/apiClient';

export const patientAPI = {
  // Получение профиля пациента
  getMyProfile: () => createApiClient('/patients/my-profile/').get(),
  
  // Обновление профиля пациента
  updateMyProfile: (data) => createApiClient('/patients/my-profile/').patch(data),
  
  // Загрузка фотографии профиля
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    return createApiClient('/patients/my-profile/').patch(formData);
  },
}; 