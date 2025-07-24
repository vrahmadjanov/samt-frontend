import { useEffect, useState } from 'react';
import locationDistricts from '../../../entities/district/service';

export function useDistricts(language = 'ru') {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    locationDistricts.getDistricts(language)
      .then(setDistricts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [language]);

  return { districts, loading, error };
} 