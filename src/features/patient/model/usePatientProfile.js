import { useState, useCallback } from 'react';
import { patientService } from '../../../entities/patient/service';

export const usePatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Получение профиля
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getMyProfile();
      setProfile(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление профиля
  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.updateMyProfile(profileData);
      // Обновляем локальное состояние
      setProfile(prev => ({ ...prev, ...data.data }));
      return data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка обновления профиля');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка фотографии
  const uploadProfilePicture = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.uploadProfilePicture(file);
      // Обновляем локальное состояние
      setProfile(prev => ({ ...prev, profile_picture: data.data.profile_picture }));
      return data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка загрузки фотографии');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    uploadProfilePicture,
  };
}; 