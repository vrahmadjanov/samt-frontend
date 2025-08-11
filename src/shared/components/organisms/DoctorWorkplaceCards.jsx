import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import Section from '../molecules/Section';

// Контейнер секции и заголовок заменены на общий компонент Section

const WorkplaceCardsContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    gap: var(--spacing-xs);
  }
`;

const WorkplaceCard = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.primary : theme.colors.white};
  border: 2px solid ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.white : theme.colors.text};
  font-size: var(--font-xs);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  text-align: center;
  min-height: 32px;
  min-width: 120px;
  max-width: 200px;
  box-shadow: ${({ theme, $isSelected }) => 
    $isSelected ? theme.shadow.card : 'none'};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme, $isSelected }) => 
      $isSelected ? theme.colors.primary : theme.colors.primary + '08'};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.card};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-xs) var(--spacing-xs);
    font-size: var(--font-xs);
    min-height: 28px;
    min-width: 100px;
    max-width: 160px;
  }
  
  @media (max-width: 480px) {
    min-width: 80px;
    max-width: 140px;
  }
`;

const DoctorWorkplaceCards = ({ doctor, selectedWorkplace, onWorkplaceSelect }) => {
  const { t } = useTranslation();

  if (!doctor.workplaces || doctor.workplaces.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.workplaces')}>
      <WorkplaceCardsContainer>
        {doctor.workplaces.map(workplace => {
          const isSelected = selectedWorkplace && selectedWorkplace.id === workplace.id;
          return (
            <WorkplaceCard 
              key={workplace.id}
              onClick={() => onWorkplaceSelect(workplace)}
              $isSelected={isSelected}
            >
              {workplace.clinic.name}
            </WorkplaceCard>
          );
        })}
      </WorkplaceCardsContainer>
    </Section>
  );
};

export default DoctorWorkplaceCards; 