import React from 'react';
import styled from 'styled-components';

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  ${({ $marginTop }) => $marginTop && `margin-top: ${$marginTop};`}
  ${({ $marginBottom }) => $marginBottom && `margin-bottom: ${$marginBottom};`}
  ${({ $marginLeft }) => $marginLeft && `margin-left: ${$marginLeft};`}
  ${({ $marginRight }) => $marginRight && `margin-right: ${$marginRight};`}
  ${({ $margin }) => $margin && `margin: ${$margin};`}
  
  ${({ $paddingTop }) => $paddingTop && `padding-top: ${$paddingTop};`}
  ${({ $paddingBottom }) => $paddingBottom && `padding-bottom: ${$paddingBottom};`}
  ${({ $paddingLeft }) => $paddingLeft && `padding-left: ${$paddingLeft};`}
  ${({ $paddingRight }) => $paddingRight && `padding-right: ${$paddingRight};`}
  ${({ $padding }) => $padding && `padding: ${$padding};`}
`;

const FormWrapper = ({ children, ...props }) => (
  <StyledFormWrapper {...props}>
    {children}
  </StyledFormWrapper>
);

export default FormWrapper; 