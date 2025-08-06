import { useState, useEffect, useCallback } from 'react';
import { fetchDoctorById } from '../../../entities/doctor/api';
import { useLanguage } from '../../i18n/model/useLanguage';

export const useDoctorDetails = (doctorId) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadDoctorDetails = useCallback(async () => {
    if (!doctorId) {
      setError(new Error('ID врача не указан'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchDoctorById(doctorId);
      setDoctor(data);
    } catch (err) {
      setError(err);
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  // Загружаем данные при изменении ID врача или языка
  useEffect(() => {
    loadDoctorDetails();
  }, [loadDoctorDetails, language]);

  return { 
    doctor, 
    loading, 
    error, 
    loadDoctorDetails 
  };
}; 