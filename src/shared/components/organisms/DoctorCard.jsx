import React, { useState, memo } from 'react';
import styled from 'styled-components';
import DoctorAvatar from '../atoms/DoctorAvatar';
import SpecialtyBadge from '../molecules/SpecialtyBadge';
import InfoBadge from '../molecules/InfoBadge';
import RatingStars from '../atoms/RatingStars';
import FavoriteButton from '../atoms/FavoriteButton';
import { addDoctorToFavorites, removeDoctorFromFavorites } from '../../../entities/doctor/favoritesApi';

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

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
`;

const Name = styled.div`
  font-size: var(--font-lg);
  font-weight: 600;
`;

const SpecialtyList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Workplace = styled.div`
  font-size: var(--font-xs);
  color: ${({ theme }) => theme.colors.textLight};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0;
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

const DoctorCard = memo(({ doctor, favorite, onFavorite }) => {
  const [loading, setLoading] = useState(false);

  const handleFavorite = async () => {
    setLoading(true);
    try {
      if (favorite) {
        await removeDoctorFromFavorites(doctor.id);
        onFavorite(doctor.id, false); // false означает удаление
      } else {
        await addDoctorToFavorites(doctor.id);
        onFavorite(doctor.id, true); // true означает добавление
      }
    } catch (e) {
      // Можно добавить toast или alert
      console.error('Error handling favorite:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    // TODO: реализовать запись к врачу
    alert('Функция записи будет реализована позже');
  };

  return (
    <Card>
      <TopRow>
        <DoctorAvatar src={doctor.profile_picture} alt={doctor.first_name + ' ' + doctor.last_name} />
        <Info>
          <Name>{doctor.last_name} {doctor.first_name} {doctor.middle_name}</Name>
          <SpecialtyList>
            {doctor.specialties.map(s => (
              <SpecialtyBadge key={s.id} icon={s.icon} name={s.name} />
            ))}
          </SpecialtyList>
          <Badges>
            {doctor.medical_category && <InfoBadge>{doctor.medical_category.name}</InfoBadge>}
            {doctor.academic_degree && <InfoBadge>{doctor.academic_degree.name}</InfoBadge>}
            {doctor.experience_level && <InfoBadge>{doctor.experience_level.level}</InfoBadge>}
          </Badges>
          <RatingStars rating={doctor.rating} />
          {doctor.workplaces && doctor.workplaces.length > 0 && (
            <Workplace>
              {doctor.workplaces[0].clinic?.name} — {doctor.workplaces[0].position}
            </Workplace>
          )}
        </Info>
      </TopRow>
      <CardFooter>
        <StyledButton onClick={handleBook}>Записаться</StyledButton>
        <FavoriteButton active={favorite} onClick={handleFavorite} disabled={loading} />
      </CardFooter>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для оптимизации
  return (
    prevProps.doctor.id === nextProps.doctor.id &&
    prevProps.favorite === nextProps.favorite &&
    prevProps.doctor.rating === nextProps.doctor.rating &&
    prevProps.doctor.specialties.length === nextProps.doctor.specialties.length
  );
});

export default DoctorCard; 