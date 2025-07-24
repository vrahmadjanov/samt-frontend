import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidthContainer};
  min-width: ${({ theme }) => theme.minWidthContainer};
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const PageWrapper = ({ children }) => <Wrapper>{children}</Wrapper>;

export default PageWrapper; 