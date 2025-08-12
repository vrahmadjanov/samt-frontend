import React from 'react';
import styled from 'styled-components';
import Section from '../molecules/Section';
import { useTranslation } from '../../i18n/useTranslation';
import { ReactComponent as HomeIcon } from '../../assets/icons/Home.svg';
import { ReactComponent as ClinicIcon } from '../../assets/icons/Clinic.svg';
import { ReactComponent as MonitorIcon } from '../../assets/icons/Monitor.svg';
import IconBadge from '../atoms/IconBadge';

const ServicesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const ServiceCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: var(--spacing-md);
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: box-shadow ${({ theme }) => theme.transition.normal}, transform ${({ theme }) => theme.transition.fast};
  will-change: transform;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
    transform: translateY(-1px);
  }
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

const ServiceFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
`;

const PriceTag = styled.div`
  margin-left: auto;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-base);

  @media (max-width: 400px) {
    margin-left: 0;
  }
`;

const getPlaceIconById = (id) => {
  switch (id) {
    case 1:
      return HomeIcon;
    case 2:
      return ClinicIcon;
    case 3:
      return MonitorIcon;
    default:
      return ClinicIcon;
  }
};

const DoctorServicesSection = ({ doctor }) => {
  const { t } = useTranslation();

  if (!doctor.services || doctor.services.length === 0) {
    return null;
  }

  return (
    <Section title={t('doctor.services')}>
      <ServicesGrid>
        {doctor.services.map((service) => {
          const PlaceIcon = getPlaceIconById(service?.service_place?.id);
          return (
            <ServiceCard key={service.id} role="group" aria-label={service.name}>
              <ServiceName>{service.name}</ServiceName>
              {service.description && (
                <ServiceDescription>{service.description}</ServiceDescription>
              )}

              <ServiceFooter>
                <IconBadge
                  icon={<PlaceIcon />}
                  label={service?.service_place?.name}
                />
                {service.price ? (
                  <PriceTag>
                    {service.price} {t('common.currency')}
                  </PriceTag>
                ) : null}
              </ServiceFooter>
            </ServiceCard>
          );
        })}
      </ServicesGrid>
    </Section>
  );
};

export default DoctorServicesSection; 