import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import RatingStars from '../atoms/RatingStars';
import InfoBadge from '../molecules/InfoBadge';
import SpecialtyBadge from '../molecules/SpecialtyBadge';

// Основной контейнер заголовка
const HeaderSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }
  
  @media (max-width: 480px) {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }
`;

// Контейнер для основного контента
const HeaderContent = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    gap: var(--spacing-md);
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    gap: var(--spacing-sm);
  }
`;

// Контейнер для аватара
const AvatarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

// Увеличенный аватар для детальной страницы
const LargeDoctorAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  background: ${({ theme }) => theme.colors.background};
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    border-width: 3px;
  }
  
  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    border-width: 3px;
  }
`;



// Основная информация о враче
const DoctorInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  
  @media (max-width: 768px) {
    gap: var(--spacing-xs);
  }
`;

// Имя врача
const DoctorName = styled.h1`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: var(--font-base);
  }
  
  @media (max-width: 480px) {
    font-size: var(--font-sm);
  }
`;



// Контейнер для специальностей
const SpecialtiesContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-top: var(--spacing-sm);
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: var(--spacing-xs);
  }
`;

// Контейнер для рейтинга и дополнительной информации
const RatingAndInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: var(--spacing-sm);
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
`;

// Контейнер для рейтинга
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// Текст рейтинга
const RatingText = styled.span`
  font-size: var(--font-xs);
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: var(--font-sm);
  }
`;

// Контейнер для бейджей с информацией
const InfoBadgesContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// Дополнительная информация
const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-xs);
    padding-top: var(--spacing-xs);
  }
`;

// Контейнер для статистики
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    justify-content: space-around;
    gap: var(--spacing-sm);
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: var(--spacing-xs);
    align-items: center;
  }
`;

// Статистический элемент
const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 80px;
  
  @media (max-width: 768px) {
    min-width: 60px;
  }
`;

// Число статистики
const StatNumber = styled.span`
  font-size: var(--font-base);
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary};
  
  @media (max-width: 768px) {
    font-size: var(--font-sm);
  }
  
  @media (max-width: 480px) {
    font-size: var(--font-xs);
  }
`;

// Описание статистики
const StatLabel = styled.span`
  font-size: var(--font-xs);
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: var(--spacing-xs);
  
  @media (max-width: 768px) {
    font-size: var(--font-xs);
  }
  
  @media (max-width: 480px) {
    font-size: var(--font-xs);
  }
`;

// Форматирование имени
const formatFullName = (firstName, lastName, middleName) => {
  const parts = [lastName, firstName];
  if (middleName) parts.push(middleName);
  return parts.join(' ');
};

// Форматирование опыта работы
const formatExperience = (experienceLevel) => {
  if (!experienceLevel) return '';
  // Если это строка, возвращаем как есть
  if (typeof experienceLevel === 'string') return experienceLevel;
  // Если это объект с полем level, возвращаем level
  if (experienceLevel.level) return experienceLevel.level;
  // Если это объект с полем name, возвращаем name
  if (experienceLevel.name) return experienceLevel.name;
  // В остальных случаях возвращаем строковое представление
  return String(experienceLevel);
};

const DoctorHeader = ({ doctor }) => {
  const { t } = useTranslation();

  return (
    <HeaderSection>
      <HeaderContent>
        <AvatarContainer>
          <LargeDoctorAvatar 
            src={doctor.profile_picture} 
            alt={formatFullName(doctor.first_name, doctor.last_name, doctor.middle_name)} 
          />
        </AvatarContainer>
        
        <DoctorInfo>
          <DoctorName>
            {formatFullName(doctor.first_name, doctor.last_name, doctor.middle_name)}
          </DoctorName>
          
          <SpecialtiesContainer>
            {doctor.specialties?.map(specialty => (
              <SpecialtyBadge 
                key={specialty.id} 
                icon={specialty.icon} 
                name={specialty.name} 
              />
            ))}
          </SpecialtiesContainer>
          
          <RatingAndInfoContainer>
            <RatingContainer>
              <RatingStars rating={doctor.rating} />
              <RatingText>
                {doctor.rating}
              </RatingText>
            </RatingContainer>
            
            <InfoBadgesContainer>
              {doctor.medical_category && (
                <InfoBadge>{doctor.medical_category.name}</InfoBadge>
              )}
              {doctor.academic_degree && (
                <InfoBadge>{doctor.academic_degree.name}</InfoBadge>
              )}
              {doctor.experience_level && (
                <InfoBadge>{formatExperience(doctor.experience_level)}</InfoBadge>
              )}
            </InfoBadgesContainer>
          </RatingAndInfoContainer>
          
          <AdditionalInfo>
                        <StatsContainer>
              <StatItem>
                <StatNumber>{doctor.workplaces?.length || 0}</StatNumber>
                <StatLabel>{t('doctor.workplaces')}</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{doctor.appointments_count || 0}</StatNumber>
                <StatLabel>{t('doctor.appointments')}</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{doctor.reviews_count || 0}</StatNumber>
                <StatLabel>{t('doctor.reviews')}</StatLabel>
              </StatItem>
            </StatsContainer>
          </AdditionalInfo>
        </DoctorInfo>
      </HeaderContent>
    </HeaderSection>
  );
};

export default DoctorHeader; 