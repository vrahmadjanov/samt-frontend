import React, { memo } from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import EntityName from '../atoms/EntityName';
import InfoBadge from '../molecules/InfoBadge';
import RatingStars from '../atoms/RatingStars';
import FavoriteButton from '../atoms/FavoriteButton';
import { addClinicToFavorites, removeClinicFromFavorites } from '../../../entities/clinic/favoritesApi';
import { ReactComponent as PhoneIcon } from '../../assets/icons/Phone.svg';
import { ReactComponent as MapIcon } from '../../assets/icons/Map.svg';

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

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.radius.md};
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  background: ${({ theme }) => theme.colors.background};
`;

const InfoCol = styled.div`
  display: grid;
  gap: var(--spacing-sm);
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-items: center;
  }
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const Address = styled.div`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.textLight};
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const GhostIconButton = styled.button`
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

  &:active { transform: scale(0.95); }

  svg { width: 20px; height: 20px; display: block; color: ${({ theme }) => theme.colors.textLight}; }
`;

const ClinicHeaderSection = memo(({ clinic, initialFavorite, onFavoriteChange }) => {
  const [favorite, setFavorite] = React.useState(Boolean(initialFavorite));
  const [favLoading, setFavLoading] = React.useState(false);

  React.useEffect(() => {
    setFavorite(Boolean(initialFavorite));
  }, [initialFavorite, clinic?.id]);

  const handleOpenMap = () => {
    if (clinic?.latitude && clinic?.longitude) {
      const url = `https://yandex.ru/maps/?pt=${clinic.longitude},${clinic.latitude}&z=16&l=map`;
      window.open(url, '_blank');
    }
  };

  const handleCall = () => {
    if (clinic?.phone_number) {
      window.location.href = `tel:${clinic.phone_number}`;
    }
  };

  return (
    <Section>
      <HeaderGrid>
        <Image src={clinic.picture} alt={clinic.name} loading="lazy" width={120} height={120} />
        <InfoCol>
          <EntityName>{clinic.name}</EntityName>
          <Badges>
            {clinic.clinic_type && <InfoBadge>{clinic.clinic_type.name}</InfoBadge>}
          </Badges>
          {clinic.rating && <RatingStars rating={clinic.rating} />}
          {clinic.address && <Address>{clinic.address}</Address>}
        </InfoCol>
      </HeaderGrid>

      <ActionsRow>
        <GhostIconButton type="button" title="Позвонить" onClick={handleCall}>
          <PhoneIcon />
        </GhostIconButton>
        <GhostIconButton type="button" title="Открыть на карте" onClick={handleOpenMap}>
          <MapIcon />
        </GhostIconButton>
        <FavoriteButton
          active={favorite}
          onClick={async () => {
            setFavLoading(true);
            try {
              if (favorite) {
                await removeClinicFromFavorites(clinic.id);
                setFavorite(false);
                onFavoriteChange && onFavoriteChange(clinic.id, false);
              } else {
                await addClinicToFavorites(clinic.id);
                setFavorite(true);
                onFavoriteChange && onFavoriteChange(clinic.id, true);
              }
            } catch (e) {
              console.error('Error handling clinic favorite:', e);
            } finally {
              setFavLoading(false);
            }
          }}
          disabled={favLoading}
        />
      </ActionsRow>
    </Section>
  );
});

export default ClinicHeaderSection;


