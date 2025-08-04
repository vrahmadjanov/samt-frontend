import React from 'react';
import styled from 'styled-components';

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || 'var(--spacing-sm)'};
`;

const FormWrapper = ({ children, marginBottom, ...props }) => (
  <StyledFormWrapper $marginBottom={marginBottom} {...props}>
    {children}
  </StyledFormWrapper>
);

export default FormWrapper; 