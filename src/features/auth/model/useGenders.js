import { useEffect, useState } from 'react';
import locationGenders from '../../../entities/gender/service';

export function useGenders(language = 'ru') {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    locationGenders.getGenders(language)
      .then(setGenders)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [language]);

  return { genders, loading, error };
} 