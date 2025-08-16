import React, { memo } from 'react';
import styled from 'styled-components';
import Label from './Label';
import FormWrapper from './FormWrapper';

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: var(--font-base);
  resize: none;
  transition: 0.2s border-color;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Textarea = memo(({ label, ...props }) => (
  <FormWrapper>
    {label && <Label>{label}</Label>}
    <StyledTextarea {...props} />
  </FormWrapper>
));

export default Textarea;


