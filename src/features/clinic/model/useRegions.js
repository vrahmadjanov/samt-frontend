import { useEffect, useState } from 'react';
import regionService from '../../../entities/region/service';

export const useRegions = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRegions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await regionService.getRegions();
        setRegions(data);
      } catch (err) {
        setError(err);
        setRegions([]);
      } finally {
        setLoading(false);
      }
    };

    loadRegions();
  }, []);

  return { regions, loading, error };
}; 