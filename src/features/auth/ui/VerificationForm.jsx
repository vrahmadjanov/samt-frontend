import React, { useState } from 'react';
import BaseForm from '../../../shared/components/molecules/BaseForm';
import Input from '../../../shared/components/atoms/Input';
import Button from '../../../shared/components/atoms/Button';
import styled from 'styled-components';

const VerificationForm = ({ phoneNumber, onVerify, error, loading }) => {
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleChange = e => {
    setConfirmationCode(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    onVerify({ phone_number: phoneNumber, confirmation_code: confirmationCode });
  };

  return (
    <BaseForm title="Подтверждение номера" onSubmit={handleSubmit}>
      <p>На номер <strong>{phoneNumber}</strong> отправлен код подтверждения.</p>
      <Input
        label="Код подтверждения"
        name="confirmation_code"
        type="text"
        value={confirmationCode}
        onChange={handleChange}
        required
        placeholder="Введите код из SMS"
        error={error}
      />
      {error && <ErrorBlock>{error}</ErrorBlock>}
      <Button type="submit" disabled={loading}>{loading ? 'Подтверждение...' : 'Подтвердить'}</Button>
    </BaseForm>
  );
};

const ErrorBlock = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.font.base};
`;

export default VerificationForm;