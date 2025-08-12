import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DoctorAvatar from '../atoms/DoctorAvatar';
import IconBadge from '../atoms/IconBadge';
import InfoBadge from '../molecules/InfoBadge';
import RatingStars from '../atoms/RatingStars';
import FavoriteButton from '../atoms/FavoriteButton';
import Button from '../atoms/Button';
import Badges from '../atoms/Badges';
import EntityName from '../atoms/EntityName';
import { CardFooter } from '../atoms/Card';
import { Card, CardTopRow, CardInfo } from '../atoms/Card';
import { addDoctorToFavorites, removeDoctorFromFavorites } from '../../../entities/doctor/favoritesApi';
import { useTranslation } from '../../../shared/i18n/useTranslation';

const SpecialtyList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Workplace = styled.div`
  font-size: var(--font-xs);
  color: ${({ theme }) => theme.colors.textLight};
`;

const DoctorCard = memo(({ doctor, favorite, onFavorite }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    // Переходим на страницу деталей врача
    navigate(`/doctors/${doctor.id}`);
  };

  return (
    <Card>
      <CardTopRow>
        <DoctorAvatar src={doctor.profile_picture} alt={doctor.first_name + ' ' + doctor.last_name} />
        <CardInfo>
          <EntityName>{doctor.last_name} {doctor.first_name} {doctor.middle_name}</EntityName>
          <SpecialtyList>
            {doctor.specialties.map(s => (
              <IconBadge key={s.id} icon={<img src={s.icon} alt={s.name} />} label={s.name} />
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
        </CardInfo>
      </CardTopRow>
      <CardFooter>
        <FavoriteButton active={favorite} onClick={handleFavorite} disabled={loading} />
        <Button onClick={handleBook}>{t('doctors.card.bookAppointment')}</Button>
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