import React from 'react';
import { FormWrapper, Title, FormContent } from './BaseForm.styled';

const BaseForm = ({ title, onSubmit, children }) => (
  <FormWrapper onSubmit={onSubmit}>
    {title && <Title>{title}</Title>}
    <FormContent>{children}</FormContent>
  </FormWrapper>
);

export default BaseForm;
