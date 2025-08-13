import React, { memo } from 'react';
import styled from 'styled-components';
import SkeletonCard from '../atoms/SkeletonCard';
import { useTranslation } from '../../i18n/useTranslation';

const BlockWrap = styled.div`
  width: 100%;
  margin: var(--spacing-lg) 0;
`;

const BlockHeader = styled.header`
  width: 100%;
  max-width: 700px;
  margin: 0 auto var(--spacing-md);
`;

const BlockTitle = styled.h3`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ClinicDoctorsSkeleton = memo(() => {
  const { t } = useTranslation();
  return (
    <BlockWrap>
      <BlockHeader>
        <BlockTitle>{t('clinics.doctorsSectionTitle') || 'Врачи клиники'}</BlockTitle>
      </BlockHeader>
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonCard key={i} avatarSize="md" avatarRound footerButtons={2} />
      ))}
    </BlockWrap>
  );
});

export default ClinicDoctorsSkeleton;


