import React, { useState } from 'react';
import BaseForm from '../molecules/BaseForm';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import ErrorMessage from '../atoms/ErrorMessage';

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
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit" disabled={loading}>{loading ? 'Подтверждение...' : 'Подтвердить'}</Button>
    </BaseForm>
  );
};

export default VerificationForm; 