import React from 'react';
import { StyledInput, Label, Wrapper } from './Input.styled';

const Input = ({ label, ...props }) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    <StyledInput {...props} />
  </Wrapper>
);

export default Input;