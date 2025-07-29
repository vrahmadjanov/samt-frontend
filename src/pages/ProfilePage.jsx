import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../shared/i18n/useTranslation';
import { usePatientProfile } from '../features/patient/model/usePatientProfile';
import ProfileHeader from '../shared/components/organisms/ProfileHeader';
import ProfileMenu from '../shared/components/organisms/ProfileMenu';

const PageContainer = styled.div`
  padding: var(--spacing-md);
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: var(--font-title);
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-lg);
  text-align: left;
`;



const ErrorMessage = styled.div`
  background: ${({ theme }) => theme.colors.errorLight};
  color: ${({ theme }) => theme.colors.error};
  padding: var(--spacing-md);
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: var(--spacing-md);
  text-align: center;
`;

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, loading, error, fetchProfile, uploadProfilePicture } = usePatientProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleEdit = () => {
    navigate('/profile/details');
  };

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
    <PageContainer>
      <PageTitle>{t('profile.title')}</PageTitle>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      <ProfileHeader
        profile={profile}
        onEdit={handleEdit}
        onUploadPicture={handleUploadPicture}
        loading={loading}
      />

      <ProfileMenu onNavigate={handleNavigate} />
    </PageContainer>
  );
};

export default ProfilePage; 