import React from 'react';
import styled from 'styled-components';
import DoctorAvatar from '../atoms/DoctorAvatar';
import SpecialtyBadge from '../molecules/SpecialtyBadge';
import InfoBadge from '../molecules/InfoBadge';

const Card = styled.div`
  display: flex;
  gap: var(--gap-md);
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: var(--spacing-lg);
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
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

const DoctorCard = ({ doctor }) => (
  <Card>
    <DoctorAvatar src={doctor.profile_picture} alt={doctor.first_name + ' ' + doctor.last_name} />
    <Info>
      <Name>{doctor.last_name} {doctor.first_name} {doctor.middle_name}, {doctor.age}</Name>
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
      <div>Рейтинг: <b>{doctor.rating}</b></div>
      {doctor.workplaces && doctor.workplaces.length > 0 && (
        <Workplace>
          {doctor.workplaces[0].clinic?.name} — {doctor.workplaces[0].position}
        </Workplace>
      )}
    </Info>
  </Card>
);

export default DoctorCard; 