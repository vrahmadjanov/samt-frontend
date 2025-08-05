import React, { memo } from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  gap: var(--gap-md);
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  transition: box-shadow ${({ theme }) => theme.transition.normal};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
  }
`;

const CardTopRow = styled.div`
  display: flex;
  gap: var(--gap-md);
  width: 100%;
`;

const CardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0;
  gap: 12px;
  background: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
`;

const Card = memo(({ children, ...props }) => {
  return <CardWrapper {...props}>{children}</CardWrapper>;
});

export { Card, CardTopRow, CardInfo, CardFooter };
export default Card; 