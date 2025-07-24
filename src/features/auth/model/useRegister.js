import { useState } from 'react';
import authService from '../../../entities/user/service';

export function useRegister() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const register = async (formData) => {
    setLoading(true);
    setErrors({});
    try {
      const response = await authService.register(formData);
      setPhoneNumber(response.phone_number);
      return response;
    } catch (err) {
      setErrors(err);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return { register, errors, loading, phoneNumber };
} 