import React, { useState } from 'react';
import BaseForm from '../../../ui/components/Form/BaseForm';
import Input from '../../../ui/components/Input/Input';
import Button from '../../../ui/components/Button/Button';

const VerificationForm = ({ phoneNumber, onVerify }) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null);

  const handleChange = e => {
    setConfirmationCode(e.target.value);
    setError(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      await onVerify({ phone_number: phoneNumber, confirmation_code: confirmationCode });
    } catch (err) {
      setError(err.message || 'Ошибка подтверждения');
    }
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
      <Button type="submit">Подтвердить</Button>
    </BaseForm>
  );
};

export default VerificationForm;