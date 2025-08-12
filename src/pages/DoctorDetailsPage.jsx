import React, { useEffect, useState } from 'react';
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

      {/* Header skeleton + content */}
      {isLoading ? (
        <div style={{ maxWidth: 700, margin: '0 auto var(--spacing-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
            <Skeleton width={120} height={120} circle />
            <div style={{ display: 'grid', gap: 8 }}>
              <Skeleton width={'60%'} height={24} />
              <Skeleton width={'40%'} height={18} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Skeleton width={90} height={20} />
                <Skeleton width={90} height={20} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DoctorHeaderSection doctor={doctor} />
      )}

      {/* Quick appointment */}
      {isLoading ? (
        <div style={{ maxWidth: 700, margin: '0 auto var(--spacing-lg)' }}>
          <Skeleton width={'100%'} height={120} />
        </div>
      ) : (
        <QuickAppointmentSection
          doctor={doctor}
          selectedWorkplace={selectedWorkplace}
          onWorkplaceSelect={setSelectedWorkplace}
        />
      )}

      {/* About */}
      {isLoading ? (
        <div style={{ maxWidth: 700, margin: '0 auto var(--spacing-lg)' }}>
          <Skeleton width={'50%'} height={20} />
          <Skeleton width={'100%'} height={80} />
        </div>
      ) : (
        <DoctorAboutSection doctor={doctor} />
      )}

      {/* Services */}
      {isLoading ? (
        <div style={{ maxWidth: 700, margin: '0 auto var(--spacing-lg)' }}>
          <Skeleton width={'100%'} height={80} />
          <Skeleton width={'100%'} height={80} />
          <Skeleton width={'100%'} height={80} />
        </div>
      ) : (
        <DoctorServicesSection doctor={doctor} />
      )}

      {/* Languages */}
      {isLoading ? (
        <div style={{ maxWidth: 700, margin: '0 auto var(--spacing-lg)' }}>
          <Skeleton width={'100%'} height={60} />
        </div>
      ) : (
        <DoctorLanguagesSection doctor={doctor} />
      )}

      {/* Titles */}
      {isLoading ? (
        <div style={{ maxWidth: 700, margin: '0 auto var(--spacing-lg)' }}>
          <Skeleton width={'100%'} height={60} />
        </div>
      ) : (
        <DoctorTitlesSection doctor={doctor} />
      )}

      {/* Education */}
      {isLoading ? (
        <div style={{ maxWidth: 700, margin: '0 auto var(--spacing-lg)' }}>
          <Skeleton width={'100%'} height={100} />
        </div>
      ) : (
        <DoctorEducationSection doctor={doctor} />
      )}
    </PageWrapper>
  );
};

export default DoctorDetailsPage; 