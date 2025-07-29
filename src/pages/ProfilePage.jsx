import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../shared/i18n/useTranslation';
import { usePatientProfile } from '../features/patient/model/usePatientProfile';
import ProfileHeader from '../shared/components/organisms/ProfileHeader';
import ProfileMenu from '../shared/components/organisms/ProfileMenu';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import PageTitle from '../shared/components/atoms/PageTitle';
import PageWrapper from '../shared/components/atoms/PageWrapper';



const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, loading, error, fetchProfile, uploadProfilePicture } = usePatientProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);



  const handleUploadPicture = async (file) => {
    try {
      await uploadProfilePicture(file);
    } catch (error) {
      console.error('Error uploading picture:', error);
    }
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <PageWrapper>
      <PageTitle>{t('profile.title')}</PageTitle>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      <ProfileHeader
        profile={profile}
        onUploadPicture={handleUploadPicture}
        loading={loading}
      />

      <ProfileMenu onNavigate={handleNavigate} />
    </PageWrapper>
  );
};

export default ProfilePage; 