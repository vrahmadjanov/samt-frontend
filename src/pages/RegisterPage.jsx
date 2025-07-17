import React, { useEffect, useState } from 'react';
import RegistrationForm from '../features/auth/components/RegistrationForm';
import VerificationForm from '../features/auth/components/VerificationForm';
import authService from '../services/authService'; // сервис с register и verify методы
import locationDistricts from '../services/districtService';
import locationGenders from '../services/genderService';

const RegistrationPage = () => {
  const [stage, setStage] = useState('register'); // register или verify
  const [phoneNumber, setPhoneNumber] = useState('');

  const [districts, setDistricts] = useState([]);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [distr, gens] = await Promise.all([
        locationDistricts.getDistricts('ru'),
        locationGenders.getGenders('ru'),
      ]);
      setDistricts(distr);
      setGenders(gens);
    }
    fetchData();
  }, []);

  const handleRegister = async formData => {
    try {
      const response = await authService.register(formData);
      setPhoneNumber(response.phone_number);
      setStage('verify');
    } catch (err) {
      // Ожидается, что err — объект с ключами полей ошибок, например:
      // { phone_number: 'Неверный формат', password: '...' }
      return Promise.reject(err);
    }
  };

  const handleVerify = async ({ phone_number, confirmation_code }) => {
    try {
      await authService.verifyCode({ phone_number, confirmation_code });
      window.location.href = '/dashboard';
    } catch (err) {
      throw err; // для отображения ошибки в VerificationForm
    }
  };

  return stage === 'register' ? (
    <RegistrationForm onRegister={handleRegister} districts={districts} genders={genders} />
  ) : (
    <VerificationForm phoneNumber={phoneNumber} onVerify={handleVerify} />
  );
};

export default RegistrationPage;
