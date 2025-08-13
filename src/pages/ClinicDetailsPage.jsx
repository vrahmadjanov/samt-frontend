import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../shared/components/atoms/PageWrapper';
import PageTitle from '../shared/components/atoms/PageTitle';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import { useClinicDetails } from '../features/clinic/model/useClinicDetails';
import ClinicHeaderSection from '../shared/components/organisms/ClinicHeaderSection';
import ClinicHeaderSkeleton from '../shared/components/organisms/ClinicHeaderSkeleton';
import { useFavoriteClinics } from '../features/clinic/model/useFavoriteClinics';
import ClinicDoctorsSection from '../shared/components/organisms/ClinicDoctorsSection';
import ClinicDoctorsSkeleton from '../shared/components/organisms/ClinicDoctorsSkeleton';

const ClinicDetailsPage = () => {
  const { id } = useParams();
  const { clinic, loading, error } = useClinicDetails(id);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteClinics();

  if (error) {
    return (
      <PageWrapper>
        <ErrorMessage>Ошибка загрузки</ErrorMessage>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageTitle>Медицинское учреждение</PageTitle>

      {loading || !clinic ? (
        <ClinicHeaderSkeleton />
      ) : (
        <ClinicHeaderSection
          clinic={clinic}
          initialFavorite={isFavorite(clinic.id)}
          onFavoriteChange={(clinicId, added) => {
            if (added) addToFavorites(clinicId);
            else removeFromFavorites(clinicId);
          }}
        />
      )}

      {loading || !clinic ? (
        <ClinicDoctorsSkeleton />
      ) : (
        <ClinicDoctorsSection clinicId={clinic.id} />
      )}
    </PageWrapper>
  );
};

export default ClinicDetailsPage;


