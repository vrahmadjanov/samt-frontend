import React, { useState } from 'react';
import BaseForm from '../../../ui/components/Form/BaseForm';
import Input from '../../../ui/components/Input/Input';
import Button from '../../../ui/components/Button/Button';
import Select from '../../../ui/components/Select/Select';

const RegistrationForm = ({ onRegister, districts, genders }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    phone_number: '',
    password: '',
    date_of_birth: '',
    district: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null })); // Сброс ошибок по полю
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});
    onRegister(formData).catch(validationErrors => {
      // Ожидается, что onRegister выбросит объект { field: message }
      setErrors(validationErrors);
    });
  };

  return (
    <BaseForm title="Регистрация" onSubmit={handleSubmit}>
      <Input
        label="Имя"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
        error={errors.first_name}
        placeholder="Введите имя"
      />
      <Input
        label="Номер телефона"
        name="phone_number"
        type="tel"
        value={formData.phone_number}
        onChange={handleChange}
        required
        error={errors.phone_number}
        placeholder="+992XXXXXXXXX"
      />
      <Input
        label="Пароль"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        error={errors.password}
        placeholder="Минимум 8 символов"
      />
      <Input
        label="Дата рождения"
        name="date_of_birth"
        type="date"
        value={formData.date_of_birth}
        onChange={handleChange}
        required
        error={errors.date_of_birth}
        placeholder="ГГГГ-ММ-ДД"
      />
      <Select
        label="Район"
        name="district"
        value={formData.district}
        onChange={handleChange}
        options={districts}
        required
        error={errors.district}
        placeholder="Выберите район"
      />
      <Select
        label="Пол"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={genders}
        required
        error={errors.gender}
        placeholder="Выберите пол"
      />
      <Button type="submit">Зарегистрироваться</Button>
    </BaseForm>
  );
};

export default RegistrationForm;
