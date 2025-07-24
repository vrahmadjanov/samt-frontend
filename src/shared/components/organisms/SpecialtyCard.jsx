import React from 'react';
import styled from 'styled-components';

const SpecialtyCard = ({ name, icon, onClick }) => (
  <Card onClick={onClick} tabIndex={0} role="button">
    <IconWrapper>
      <Icon src={icon} alt={name} />
    </IconWrapper>
    <Name>{name}</Name>
  </Card>
);

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  min-width: 120px;
  min-height: 160px;
  outline: none;

  &:hover, &:focus {
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
    transform: translateY(-2px) scale(1.03);
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.font.base};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-weight: 500;
`;

export default SpecialtyCard; 