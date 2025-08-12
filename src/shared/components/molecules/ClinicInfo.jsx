import React, { memo } from 'react';
import styled from 'styled-components';

const ClinicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
`;


// removed unused ClinicDetails

const ClinicName = styled.h4`
  font-size: var(--font-lg);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: var(--font-base);
  }
`;

const ClinicAddress = styled.p`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
  line-height: 1.4;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: var(--font-xs);
  }
`;

const ClinicInfo = memo(({ clinic }) => {
  return (
    <ClinicContainer>
        <ClinicName>{clinic.name}</ClinicName>
        <ClinicAddress>{clinic.address}</ClinicAddress>
    </ClinicContainer>
  );
});

export default ClinicInfo;