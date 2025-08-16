import React from 'react';
import styled from 'styled-components';

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormWrapper = ({ children, ...props }) => (
  <StyledFormWrapper {...props}>
    {children}
  </StyledFormWrapper>
);

export default FormWrapper; 