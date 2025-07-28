import React, { useState } from 'react';
import styled from 'styled-components';
import InfoBadge from '../molecules/InfoBadge';
import RatingStars from '../atoms/RatingStars';
import FavoriteButton from '../atoms/FavoriteButton';
import { addClinicToFavorites, removeClinicFromFavorites } from '../../../entities/clinic/favoritesApi';

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
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: var(--spacing-md);
  gap: var(--gap-md);
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

const ClinicCard = ({ clinic, favorite, onFavorite }) => {
  const [loading, setLoading] = useState(false);

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

  return (
    <Card>
      <TopRow>
        <ClinicImage>
          {clinic.image ? (
            <img src={clinic.image} alt={clinic.name} />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '12px'
            }}>
              КЛИНИКА
            </div>
          )}
        </ClinicImage>
        <Info>
          <Name>{clinic.name}</Name>
          {clinic.address && <Address>{clinic.address}</Address>}
          <Badges>
            {clinic.type && <InfoBadge>{clinic.type}</InfoBadge>}
            {clinic.doctors_count && <InfoBadge>Врачей: {clinic.doctors_count}</InfoBadge>}
          </Badges>
          {clinic.rating && <RatingStars rating={clinic.rating} />}
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
        <StyledButton onClick={handleViewDoctors}>Врачи клиники</StyledButton>
        <FavoriteButton active={favorite} onClick={handleFavorite} disabled={loading} />
      </CardFooter>
    </Card>
  );
};

export default ClinicCard; 