import React, { memo } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';
import Section from '../molecules/Section';
import ClinicInfo from '../molecules/ClinicInfo';
import InfoBadge from '../molecules/InfoBadge';
import Badges from '../atoms/Badges';

const WorkplaceItem = styled.div`
  display: grid;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

const List = styled.div`
  display: grid;
  gap: var(--spacing-md);
`;

const DoctorWorkplacesListSection = memo(({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor?.workplaces || doctor.workplaces.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.workplacesSectionTitle') || 'Места работы врача'}>
      <List>
        {doctor.workplaces.map((workplace) => (
          <WorkplaceItem key={workplace.id}>
            {workplace.clinic && <ClinicInfo clinic={workplace.clinic} />}
            <Badges>
              {workplace.position && <InfoBadge>{workplace.position}</InfoBadge>}
              {workplace.office_number && (
                <InfoBadge>
                  {t('doctor.office')}: {workplace.office_number}
                </InfoBadge>
              )}
              {workplace.appointment_interval && (
                <InfoBadge>
                  {t('doctor.appointmentInterval')}: {workplace.appointment_interval} {t('common.minutes')}
                </InfoBadge>
              )}
            </Badges>
          </WorkplaceItem>
        ))}
      </List>
    </Section>
  );
});

export default DoctorWorkplacesListSection;


