import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '../shared/i18n/useTranslation';
import { useDoctorDetails } from '../features/doctor/model/useDoctorDetails';
import PageWrapper from '../shared/components/atoms/PageWrapper';
import PageTitle from '../shared/components/atoms/PageTitle';
import LoadingMessage from '../shared/components/atoms/LoadingMessage';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import DoctorHeaderSection from '../shared/components/organisms/DoctorHeaderSection';
import DoctorAboutSection from '../shared/components/organisms/DoctorAboutSection';
import DoctorBasicInfoSection from '../shared/components/organisms/DoctorBasicInfoSection';
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

  if (loading) {
    return (
      <PageWrapper>
        <LoadingMessage>{t('common.loading')}</LoadingMessage>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <ErrorMessage>{t('common.error')}</ErrorMessage>
      </PageWrapper>
    );
  }

  if (!doctor) {
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
      
      <DoctorHeaderSection doctor={doctor} />
      <QuickAppointmentSection 
        doctor={doctor} 
        selectedWorkplace={selectedWorkplace}
        onWorkplaceSelect={setSelectedWorkplace}
      />
      <DoctorAboutSection doctor={doctor} />
      <DoctorBasicInfoSection doctor={doctor} />
      <DoctorServicesSection doctor={doctor} />
      <DoctorLanguagesSection doctor={doctor} />
      <DoctorTitlesSection doctor={doctor} />
      <DoctorEducationSection doctor={doctor} />
    </PageWrapper>
  );
};

export default DoctorDetailsPage; 