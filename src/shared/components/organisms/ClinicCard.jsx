import React, { useState, memo } from 'react';
import styled from 'styled-components';
import InfoBadge from '../molecules/InfoBadge';
import RatingStars from '../atoms/RatingStars';
import FavoriteButton from '../atoms/FavoriteButton';
import { addClinicToFavorites, removeClinicFromFavorites } from '../../../entities/clinic/favoritesApi';
import { useTranslation } from '../../../shared/i18n/useTranslation';
import { ReactComponent as MapIcon } from '../../assets/icons/Map.svg';

const Card = styled.div`
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
`;

const TopRow = styled.div`
  display: flex;
  gap: var(--gap-md);
  width: 100%;
`;

const ClinicImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
`;

const Name = styled.div`
  font-size: var(--font-lg);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Address = styled.div`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.textLight};
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Description = styled.div`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.5;
  margin-top: var(--spacing-sm);
`;

const Schedule = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: var(--spacing-sm);
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 400;
  flex-wrap: wrap;
  
  .schedule-label {
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 400;
    white-space: nowrap;
  }
  
  .schedule-time {
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 400;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: var(--spacing-md);
  gap: 12px;
  background: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
`;

const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 10px 18px;
  font-size: var(--font-base);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 110px;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || theme.colors.primary};
    opacity: 0.95;
  }
`;

const MapButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0;
  cursor: pointer;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transition.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.hover.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
    display: block;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const ClinicCard = memo(({ clinic, favorite, onFavorite }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavorite = async () => {
    setLoading(true);
    try {
      if (favorite) {
        await removeClinicFromFavorites(clinic.id);
        onFavorite(clinic.id, false); // false означает удаление
      } else {
        await addClinicToFavorites(clinic.id);
        onFavorite(clinic.id, true); // true означает добавление
      }
    } catch (e) {
      // Можно добавить toast или alert
      console.error('Error handling clinic favorite:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDoctors = () => {
    // TODO: реализовать переход к врачам клиники
    alert('Функция просмотра врачей клиники будет реализована позже');
  };

  const handleOpenMap = () => {
    if (clinic.latitude && clinic.longitude) {
      const url = `https://yandex.ru/maps/?pt=${clinic.longitude},${clinic.latitude}&z=16&l=map`;
      window.open(url, '_blank');
    }
  };

  // Функция для определения статуса работы клиники
  const getClinicStatus = (schedule) => {
    if (!schedule) return { isOpen: false, text: 'Нет расписания' };
    
    try {
      // Парсим расписание в формате "08:00 - 18:00"
      const [startTime, endTime] = schedule.split(' - ');
      if (!startTime || !endTime) return { isOpen: false, text: schedule };
      
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      
      const isOpen = currentTime >= startMinutes && currentTime <= endMinutes;
      
      return {
        isOpen,
        text: `${startTime}-${endTime}`,
        schedule: schedule
      };
    } catch (error) {
      return { isOpen: false, text: schedule };
    }
  };

  return (
    <Card>
      <TopRow>
        <ClinicImage>
          {clinic.picture && !imageError ? (
            <img 
              src={clinic.picture} 
              alt={clinic.name}
              onError={() => setImageError(true)}
            />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              КЛИНИКА
            </div>
          )}
        </ClinicImage>
        <Info>
          <Name>{clinic.name}</Name>
          {clinic.address && <Address>{clinic.address}</Address>}
          <Badges>
            {clinic.clinic_type && <InfoBadge>{clinic.clinic_type.name}</InfoBadge>}
            {clinic.doctors_count && <InfoBadge>{t('clinics.card.doctorsCount')}: {clinic.doctors_count}</InfoBadge>}
          </Badges>
          {clinic.rating && <RatingStars rating={clinic.rating} />}
          {clinic.schedule && (
            <Schedule>
              <span className="schedule-label">{t('clinics.card.scheduleToday')}</span>
              <span className="schedule-time">{getClinicStatus(clinic.schedule).text}</span>
            </Schedule>
          )}
          {clinic.description && (
            <Description>
              {clinic.description.length > 150 
                ? `${clinic.description.substring(0, 150)}...` 
                : clinic.description}
            </Description>
          )}
        </Info>
      </TopRow>
      <CardFooter>
        <FavoriteButton active={favorite} onClick={handleFavorite} disabled={loading} />
        {clinic.latitude && clinic.longitude && (
          <MapButton onClick={handleOpenMap} title="Открыть на карте">
            <MapIcon />
          </MapButton>
        )}
        <StyledButton onClick={handleViewDoctors}>{t('clinics.card.viewDoctors')}</StyledButton>
      </CardFooter>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.clinic.id === nextProps.clinic.id &&
    prevProps.favorite === nextProps.favorite &&
    prevProps.clinic.rating === nextProps.clinic.rating &&
    prevProps.clinic.doctors_count === nextProps.clinic.doctors_count
  );
});

export default ClinicCard; 