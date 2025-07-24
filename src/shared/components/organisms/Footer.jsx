import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  height: ${({ theme }) => theme.footerHeight};
  background: ${({ theme }) => theme.colors.backgroundGradient};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.font.base};
  margin-top: auto;
`;

const Footer = () => (
  <FooterWrapper>
    © {new Date().getFullYear()} SAMT. Все права защищены.
  </FooterWrapper>
);

export default Footer; 