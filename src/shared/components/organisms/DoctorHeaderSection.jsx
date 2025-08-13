import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import Section from '../molecules/Section';
import EntityName from '../atoms/EntityName';
import RatingStars from '../atoms/RatingStars';
import InfoBadge from '../molecules/InfoBadge';
import IconBadge from '../atoms/IconBadge';
import FavoriteButton from '../atoms/FavoriteButton';
import { addDoctorToFavorites, removeDoctorFromFavorites } from '../../../entities/doctor/favoritesApi';
import { ReactComponent as PhoneIcon } from '../../assets/icons/Phone.svg';
import { ReactComponent as ChatIcon } from '../../assets/icons/Chat.svg';
import IconButton from '../atoms/IconButton';

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-lg);
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    gap: var(--spacing-md);
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
    border-width: 3px;
  }
`;

const InfoCol = styled.div`
  display: grid;
  gap: var(--spacing-sm);
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    gap: var(--spacing-xs);
  }
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    gap: var(--spacing-sm);
  }
`;

const RatingWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    width: 100%;
  }
`;

// Лаконичная обёртка статистики
const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  width: 100%;
`;


function formatFullName(firstName, lastName, middleName) {
  const parts = [lastName, firstName].filter(Boolean);
  if (middleName) parts.push(middleName);
  return parts.join(' ');
}

function formatExperience(experienceLevel) {
  if (!experienceLevel) return '';
  if (typeof experienceLevel === 'string') return experienceLevel;
  if (experienceLevel.level) return experienceLevel.level;
  if (experienceLevel.name) return experienceLevel.name;
  return String(experienceLevel);
}

const DoctorHeaderSection = memo(({ doctor, initialFavorite, onFavoriteChange }) => {
  useTranslation();
  const [favorite, setFavorite] = React.useState(Boolean(initialFavorite ?? doctor?.is_favorite));
  const [favLoading, setFavLoading] = React.useState(false);

  React.useEffect(() => {
    setFavorite(Boolean(initialFavorite ?? doctor?.is_favorite));
  }, [initialFavorite, doctor?.is_favorite, doctor?.id]);

  const fullName = useMemo(
    () => formatFullName(doctor.first_name, doctor.last_name, doctor.middle_name),
    [doctor.first_name, doctor.last_name, doctor.middle_name]
  );

  return (
    <Section>
      <HeaderGrid>
        <Avatar src={doctor.profile_picture || ''} alt={fullName} />

        <InfoCol>
          <EntityName>{fullName || ' '}</EntityName>

          <TagsRow>
            {doctor.specialties?.map((s) => (
              <IconBadge key={s.id} icon={<img src={s.icon} alt={s.name} />} label={s.name} />
            ))}
          </TagsRow>

            <RatingWrap>
                <RatingStars rating={doctor.rating} />
            </RatingWrap>

          <MetaRow>

            {doctor.medical_category && <InfoBadge>{doctor.medical_category.name}</InfoBadge>}
            {doctor.academic_degree && <InfoBadge>{doctor.academic_degree.name}</InfoBadge>}
            {doctor.experience_level && (
              <InfoBadge>{formatExperience(doctor.experience_level)}</InfoBadge>
            )}
          </MetaRow>

          <ActionsRow>
            <IconButton title="Позвонить">
              <PhoneIcon />
            </IconButton>
            <IconButton title="Написать">
              <ChatIcon />
            </IconButton>
            <FavoriteButton
              active={favorite}
              onClick={async () => {
                setFavLoading(true);
                try {
                  if (favorite) {
                    await removeDoctorFromFavorites(doctor.id);
                    setFavorite(false);
                    onFavoriteChange && onFavoriteChange(doctor.id, false);
                  } else {
                    await addDoctorToFavorites(doctor.id);
                    setFavorite(true);
                    onFavoriteChange && onFavoriteChange(doctor.id, true);
                  }
                } catch (e) {
                  console.error('Error handling favorite:', e);
                } finally {
                  setFavLoading(false);
                }
              }}
              disabled={favLoading}
            />
          </ActionsRow>
        </InfoCol>
      </HeaderGrid>
    </Section>
  );
});

export default DoctorHeaderSection;