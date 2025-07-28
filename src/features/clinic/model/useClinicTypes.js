import { useEffect, useState } from 'react';
import clinicTypeService from '../../../entities/clinicType/service';

export const useClinicTypes = () => {
  const [clinicTypes, setClinicTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClinicTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await clinicTypeService.getClinicTypes();
        setClinicTypes(data);
      } catch (err) {
        setError(err);
        setClinicTypes([]);
      } finally {
        setLoading(false);
      }
    };

    loadClinicTypes();
  }, []);

  return { clinicTypes, loading, error };
}; 