import React from 'react';
import styled from 'styled-components';
import DoctorAvatar from '../atoms/DoctorAvatar';
import CardName from '../atoms/CardName';
import SpecialtyBadge from '../molecules/SpecialtyBadge';
import InfoBadge from '../molecules/InfoBadge';
import RatingStars from '../atoms/RatingStars';
import Badges from '../atoms/Badges';
import {CardTopRow, CardInfo } from '../atoms/Card';

const HeaderSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const SpecialtyList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const DoctorHeader = ({ doctor }) => {

  return (
    <HeaderSection>
        <CardTopRow>
          <DoctorAvatar src={doctor.profile_picture} alt={doctor.first_name + ' ' + doctor.last_name} />
          <CardInfo>
            <CardName>{doctor.last_name} {doctor.first_name} {doctor.middle_name}</CardName>
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
          </CardInfo>
        </CardTopRow>
    </HeaderSection>
  );
};

export default DoctorHeader; 