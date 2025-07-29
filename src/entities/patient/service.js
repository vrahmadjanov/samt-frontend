import { patientAPI } from './api';

export const patientService = {
  // Получение профиля пациента
  async getMyProfile() {
    try {
      const response = await patientAPI.getMyProfile();
      return response.data;
    } catch (error) {
      console.error('Error fetching patient profile:', error);
      throw error;
    }
  },

  // Обновление профиля пациента
  async updateMyProfile(profileData) {
    try {
      const response = await patientAPI.updateMyProfile(profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating patient profile:', error);
      throw error;
    }
  },

  // Загрузка фотографии профиля
  async uploadProfilePicture(file) {
    try {
      const response = await patientAPI.uploadProfilePicture(file);
      return response.data;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  },
}; 