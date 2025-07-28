import { useEffect, useState } from 'react';
import districtService from '../../../entities/district/api';

export const useDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDistricts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await districtService.fetchDistricts();
        setDistricts(data);
      } catch (err) {
        setError(err);
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    };

    loadDistricts();
  }, []);

  return { districts, loading, error };
}; 