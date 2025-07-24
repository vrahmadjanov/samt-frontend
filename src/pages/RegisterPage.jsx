import React, { useEffect, useState } from 'react';
import RegistrationForm from '../features/auth/ui/RegistrationForm';
import VerificationForm from '../features/auth/ui/VerificationForm';
import { useRegister } from '../features/auth/model/useRegister';
import { useVerification } from '../features/auth/model/useVerification';
import { useDistricts } from '../features/auth/model/useDistricts';
import { useGenders } from '../features/auth/model/useGenders';

const RegistrationPage = () => {
  const [stage, setStage] = useState('register');
  const { register, errors, loading, phoneNumber } = useRegister();
  const { verify, error: verifyError, loading: verifyLoading } = useVerification();
  const { districts } = useDistricts('ru');
  const { genders } = useGenders('ru');

  useEffect(() => {
    if (phoneNumber) setStage('verify');
  }, [phoneNumber]);

  const handleRegister = async (formData) => {
    await register(formData);
  };

  const handleVerify = async ({ phone_number, confirmation_code }) => {
    await verify({ phone_number, confirmation_code });
  };

  return stage === 'register' ? (
    <RegistrationForm
      onRegister={handleRegister}
      districts={districts}
      genders={genders}
      errors={errors}
      loading={loading}
    />
  ) : (
    <VerificationForm
      phoneNumber={phoneNumber}
      onVerify={handleVerify}
      error={verifyError}
      loading={verifyLoading}
    />
  );
};

export default RegistrationPage;
