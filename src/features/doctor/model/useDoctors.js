import { useEffect, useState } from 'react';
import { fetchDoctors } from '../../../entities/doctor/api';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchDoctors()
      .then(data => setDoctors(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { doctors, loading, error };
}; 