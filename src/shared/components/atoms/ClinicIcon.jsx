import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ClinicSvgIcon } from '../../assets/icons/Clinic.svg';

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  
  svg {
    width: 32px;
    height: 32px;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 64px;
    height: 64px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ClinicIconComponent = () => (
  <IconWrapper>
    <ClinicSvgIcon />
  </IconWrapper>
);

export default ClinicIconComponent; 