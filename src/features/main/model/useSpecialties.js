import { useEffect, useState } from 'react';
import specialtyService from '../../../entities/specialty/service';

export function useSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    specialtyService.getSpecialties()
      .then(setSpecialties)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { specialties, loading, error };
} 