import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useTranslation } from '../shared/i18n/useTranslation';
import { useDoctorDetails } from '../features/doctor/model/useDoctorDetails';
import PageWrapper from '../shared/components/atoms/PageWrapper';
import PageTitle from '../shared/components/atoms/PageTitle';
import Skeleton from '../shared/components/atoms/Skeleton';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import DoctorHeaderSection from '../shared/components/organisms/DoctorHeaderSection';
import DoctorAboutSection from '../shared/components/organisms/DoctorAboutSection';
import QuickAppointmentSection from '../shared/components/organisms/QuickAppointmentSection';
import DoctorTitlesSection from '../shared/components/organisms/DoctorTitlesSection';
import DoctorLanguagesSection from '../shared/components/organisms/DoctorLanguagesSection';
import DoctorServicesSection from '../shared/components/organisms/DoctorServicesSection';
import DoctorEducationSection from '../shared/components/organisms/DoctorEducationSection';

// Styled skeleton containers matching section styles
const SectionSkeleton = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`;

const HeaderSkGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--spacing-md);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const AvatarSk = styled(Skeleton)`
  width: 120px;
  height: 120px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const NameSk = styled(Skeleton)`
  width: 60%;
  height: 24px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 70%;
    height: 22px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BadgeRowSk = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const BadgeSk = styled(Skeleton)`
  width: 90px;
  height: 20px;
`;

const RatingSk = styled(Skeleton)`
  width: 120px;
  height: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const WorkplaceSk = styled(Skeleton)`
  width: 50%;
  height: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ActionsRowSk = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const IconBtnSk = styled(Skeleton)`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
`;

const BlockSk = styled(Skeleton)`
  width: 100%;
`;

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { doctor, loading, error } = useDoctorDetails(id);
  const [selectedWorkplace, setSelectedWorkplace] = useState(null);

  // Автоматически выбираем первое место работы, если еще не выбрано
  useEffect(() => {
    if (doctor?.workplaces && doctor.workplaces.length > 0 && !selectedWorkplace) {
      setSelectedWorkplace(doctor.workplaces[0]);
    }
  }, [doctor, selectedWorkplace]);

  const isLoading = loading;

  if (error) {
    return (
      <PageWrapper>
        <ErrorMessage>{t('common.error')}</ErrorMessage>
      </PageWrapper>
    );
  }

  if (!doctor && !isLoading) {
    return (
      <PageWrapper>
        <ErrorMessage>{t('doctors.notFound')}</ErrorMessage>
      </PageWrapper>
    );
  }


  return (
    <PageWrapper>
      <PageTitle>
        {t('doctor.profile')}
      </PageTitle>

      {isLoading ? (
        <SectionSkeleton>
          <HeaderSkGrid>
            <AvatarSk circle />
            <div style={{ display: 'grid', gap: 8, width: '100%' }}>
              <NameSk />
              <BadgeRowSk>
                <BadgeSk />
                <BadgeSk />
                <BadgeSk />
              </BadgeRowSk>
              <RatingSk />
              <WorkplaceSk />
            </div>
          </HeaderSkGrid>
          <ActionsRowSk>
            <IconBtnSk />
            <IconBtnSk />
            <IconBtnSk />
          </ActionsRowSk>
        </SectionSkeleton>
      ) : (
        <DoctorHeaderSection doctor={doctor} />
      )}

      {isLoading ? (
        <SectionSkeleton>
          <BlockSk height={160} />
        </SectionSkeleton>
      ) : (
        <QuickAppointmentSection
          doctor={doctor}
          selectedWorkplace={selectedWorkplace}
          onWorkplaceSelect={setSelectedWorkplace}
        />
      )}

      {isLoading ? (
        <SectionSkeleton>
          <BlockSk height={20} />
          <BlockSk height={70} />
        </SectionSkeleton>
      ) : (
        <DoctorAboutSection doctor={doctor} />
      )}

      {isLoading ? (
        <SectionSkeleton>
          <BlockSk height={90} />
          <BlockSk height={90} />
          <BlockSk height={90} />
        </SectionSkeleton>
      ) : (
        <DoctorServicesSection doctor={doctor} />
      )}

      {isLoading ? (
        <SectionSkeleton>
          <BlockSk height={60} />
          <BlockSk height={60} />
          <BlockSk height={60} />
        </SectionSkeleton>
      ) : (
        <DoctorLanguagesSection doctor={doctor} />
      )}

      {isLoading ? (
        <SectionSkeleton>
          <BlockSk height={48} />
        </SectionSkeleton>
      ) : (
        <DoctorTitlesSection doctor={doctor} />
      )}

      {isLoading ? (
        <SectionSkeleton>
          <BlockSk height={100} />
        </SectionSkeleton>
      ) : (
        <DoctorEducationSection doctor={doctor} />
      )}
    </PageWrapper>
  );
};

export default DoctorDetailsPage; 