import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.headerHeight};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.font.header};
  font-weight: ${({ theme }) => theme.font.weightBold};
  letter-spacing: 1px;
`;

const Header = () => (
  <HeaderWrapper>
    SAMT
  </HeaderWrapper>
);

export default Header; 