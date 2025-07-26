import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidthContainer};
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  
  /* Создаем эффект глубины */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.background};
    z-index: -1;
  }
`;

const PageWrapper = ({ children }) => <Wrapper>{children}</Wrapper>;

export default PageWrapper; 