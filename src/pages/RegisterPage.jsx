import React, { useEffect, useState } from 'react';
import RegistrationForm from '../features/auth/ui/RegistrationForm';
import VerificationForm from '../features/auth/ui/VerificationForm';
import { useRegister } from '../features/auth/model/useRegister';
import { useVerification } from '../features/auth/model/useVerification';
import { useDistricts } from '../features/auth/model/useDistricts';
import { useGenders } from '../features/auth/model/useGenders';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
`;

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

  return (
    <PageWrapper>
      {stage === 'register' ? (
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
      )}
    </PageWrapper>
  );
};

export default RegistrationPage;
