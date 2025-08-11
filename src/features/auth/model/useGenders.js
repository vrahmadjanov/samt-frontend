import { useEffect, useRef, useState, useCallback } from 'react';
import locationGenders from '../../../entities/gender/service';

export function useGenders(language = 'ru') {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastRequestKeyRef = useRef(null);

  const loadGenders = useCallback(() => {
    const requestKey = JSON.stringify({ language });
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    setLoading(true);
    setError(null);
    locationGenders.getGenders(language)
      .then(setGenders)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [language]);

  useEffect(() => {
    loadGenders();
  }, [loadGenders]);

  return { genders, loading, error };
} 