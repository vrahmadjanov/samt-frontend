import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';

const ServiceCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: var(--spacing-md);
  background: ${({ theme }) => theme.colors.white};
  margin-bottom: var(--spacing-sm);
`;

const ServiceName = styled.h4`
  font-size: var(--font-base);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 var(--spacing-xs) 0;
`;

const ServiceDescription = styled.p`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 var(--spacing-sm) 0;
`;

const ServiceInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const InfoLabel = styled.span`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const DoctorServicesSection = ({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor.services || doctor.services.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.services')}>
      {doctor.services.map(service => (
        <ServiceCard key={service.id}>
          <ServiceName>{service.name}</ServiceName>
          <ServiceDescription>{service.description}</ServiceDescription>
          <ServiceInfo>
            <InfoItem>
              <InfoLabel>{t('doctor.servicePlace')}</InfoLabel>
              <InfoValue>{service.service_place.name}</InfoValue>
            </InfoItem>
            {service.price && (
              <InfoItem>
                <InfoLabel>{t('doctor.price')}</InfoLabel>
                <InfoValue>{service.price} {t('common.currency')}</InfoValue>
              </InfoItem>
            )}
          </ServiceInfo>
        </ServiceCard>
      ))}
    </Section>
  );
};

export default DoctorServicesSection; 