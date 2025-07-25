import React, { useEffect, useState } from 'react';
import RegistrationStepper from '../features/auth/ui/RegistrationForm';
import VerificationForm from '../features/auth/ui/VerificationForm';
import { useRegister } from '../features/auth/model/useRegister';
import { useVerification } from '../features/auth/model/useVerification';
import { useDistricts } from '../features/auth/model/useDistricts';
import { useGenders } from '../features/auth/model/useGenders';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CenteredWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.backgroundGradient};
`;

const RegistrationPage = () => {
  const [stage, setStage] = useState('register');
  const { register, errors, loading, phoneNumber } = useRegister();
  const navigate = useNavigate();
  const { verify, error: verifyError, loading: verifyLoading } = useVerification({ navigate });
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
    <CenteredWrapper>
      {stage === 'register' ? (
        <RegistrationStepper
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
    </CenteredWrapper>
  );
};

export default RegistrationPage;
