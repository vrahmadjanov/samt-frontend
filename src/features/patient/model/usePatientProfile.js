  import { useState, useCallback, useRef, useEffect } from 'react';
import { patientService } from '../../../entities/patient/service';
import { useLanguage } from '../../i18n/model/useLanguage';

export const usePatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const lastRequestKeyRef = useRef(null);

  // Получение профиля
  const fetchProfile = useCallback(async () => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getMyProfile();
      setProfile(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Обновление профиля
  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await patientService.updateMyProfile(profileData);
      setProfile(prev => ({ ...prev, ...updated }));
      return updated;
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
      const updated = await patientService.uploadProfilePicture(file);
      setProfile(prev => ({ ...prev, profile_picture: updated.profile_picture }));
      return updated;
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