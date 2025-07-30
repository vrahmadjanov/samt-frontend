import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../shared/i18n/useTranslation';
import { usePatientProfile } from '../features/patient/model/usePatientProfile';
import authService from '../entities/user/service';
import PageWrapper from '../shared/components/atoms/PageWrapper';
import PageTitle from '../shared/components/atoms/PageTitle';
import Button from '../shared/components/atoms/Button';
import Input from '../shared/components/atoms/Input';
import Select from '../shared/components/atoms/Select';
import ErrorMessage from '../shared/components/atoms/ErrorMessage';
import ProfileHeader from '../shared/components/organisms/ProfileHeader';


const PatientProfileDetailsPage = () => {
  const { t } = useTranslation();
  const { profile, loading, error, fetchProfile, updateProfile, uploadProfilePicture } = usePatientProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Загружаем данные только если их еще нет
    if (!profile) {
      fetchProfile();
    }
  }, [fetchProfile, profile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        middle_name: profile.middle_name || '',
        email: profile.email || '',
        actual_address: profile.actual_address || '',
        weight: profile.weight || '',
        height: profile.height || '',
        blood_type: profile.blood_type || '',
        inn: profile.inn || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      middle_name: profile.middle_name || '',
      email: profile.email || '',
      actual_address: profile.actual_address || '',
      weight: profile.weight || '',
      height: profile.height || '',
      blood_type: profile.blood_type || '',
      inn: profile.inn || ''
    });
    setIsEditing(false);
  };

  const bloodTypeOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];



  const handleDeleteAccount = async () => {
    if (window.confirm(t('profileDetails.deleteConfirm'))) {
      setDeleteLoading(true);
      try {
        await authService.deleteAccount();
      } catch (error) {
        console.error('Error deleting account:', error);
        setDeleteLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (error && !profile) {
    return (
      <PageWrapper>
        <ErrorMessage>{error}</ErrorMessage>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageTitle>{t('profileDetails.title')}</PageTitle>

              <ProfileContainer>
          <ProfileHeader
            profile={profile}
            onUploadPicture={uploadProfilePicture}
            loading={loading}
          />

        <ProfileSection>
          <SectionTitle>{t('profileDetails.personalInfo')}</SectionTitle>
          
          <Form onSubmit={handleSave}>
            <FormRow>
                             <Input
                 label={t('profileDetails.firstName')}
                 name="first_name"
                 value={formData.first_name}
                 onChange={handleChange}
                 disabled={!isEditing || loading}
                 required
               />
                             <Input
                 label={t('profileDetails.lastName')}
                 name="last_name"
                 value={formData.last_name}
                 onChange={handleChange}
                 disabled={!isEditing || loading}
                 required
               />
            </FormRow>

            <FormRow>
                             <Input
                 label={t('profileDetails.middleName')}
                 name="middle_name"
                 value={formData.middle_name}
                 onChange={handleChange}
                 disabled={!isEditing || loading}
               />
                             <Input
                 label={t('profileDetails.email')}
                 name="email"
                 type="email"
                 value={formData.email}
                 onChange={handleChange}
                 disabled={!isEditing || loading}
               />
            </FormRow>

                         <Input
               label={t('profileDetails.address')}
               name="actual_address"
               value={formData.actual_address}
               onChange={handleChange}
               disabled={!isEditing || loading}
             />
          </Form>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>{t('profileDetails.medicalInfo')}</SectionTitle>
          
          <Form onSubmit={handleSave}>
            <FormRow>
                             <Input
                 label={t('profileDetails.weight')}
                 name="weight"
                 type="number"
                 value={formData.weight}
                 onChange={handleChange}
                 disabled={!isEditing || loading}
               />
                             <Input
                 label={t('profileDetails.height')}
                 name="height"
                 type="number"
                 value={formData.height}
                 onChange={handleChange}
                 disabled={!isEditing || loading}
               />
            </FormRow>

            <FormRow>
                             <Select
                 label={t('profileDetails.bloodType')}
                 name="blood_type"
                 value={formData.blood_type}
                 onChange={handleChange}
                 options={bloodTypeOptions}
                 disabled={!isEditing || loading}
               />
                             <Input
                 label={t('profileDetails.inn')}
                 name="inn"
                 value={formData.inn}
                 onChange={handleChange}
                 disabled={!isEditing || loading}
               />
            </FormRow>
          </Form>
        </ProfileSection>

        {profile && (
                  <ProfileSection>
          <SectionTitle>{t('profileDetails.additionalInfo')}</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>{t('profileDetails.phoneNumber')}:</InfoLabel>
                <InfoValue>{profile.phone_number}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('profileDetails.birthDate')}:</InfoLabel>
                <InfoValue>{formatDate(profile.date_of_birth)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('profileDetails.gender')}:</InfoLabel>
                <InfoValue>{profile.gender?.name}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('profileDetails.district')}:</InfoLabel>
                <InfoValue>{profile.district?.name}</InfoValue>
              </InfoItem>
              {profile.subscription && (
                <InfoItem>
                  <InfoLabel>{t('profileDetails.subscription')}:</InfoLabel>
                  <InfoValue>{profile.subscription.name}</InfoValue>
                </InfoItem>
              )}
            </InfoGrid>
          </ProfileSection>
        )}

        <ActionButtons>
          {!isEditing ? (
            <ButtonGroup>
              <DangerButton onClick={handleDeleteAccount} disabled={deleteLoading || loading}>
                {deleteLoading ? t('profileDetails.deleting') : t('profileDetails.deleteProfile')}
              </DangerButton>
              <Button onClick={() => setIsEditing(true)} disabled={loading}>
                {t('profileDetails.edit')}
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <Button type="submit" onClick={handleSave} disabled={saveLoading}>
                {saveLoading ? t('profileDetails.saving') : t('profileDetails.save')}
              </Button>
              <CancelButton onClick={handleCancel}>
                {t('profileDetails.cancel')}
              </CancelButton>
            </ButtonGroup>
          )}
        </ActionButtons>
      </ProfileContainer>
      

    </PageWrapper>
  );
};



const ProfileContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const ProfileSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
`;

const SectionTitle = styled.h3`
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-lg);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const InfoLabel = styled.span`
  font-size: var(--font-sm);
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const InfoValue = styled.span`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-xl);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[400]};
  }
`;



const DangerButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.error};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.errorDark || '#d32f2f'};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
  }
`;

export default PatientProfileDetailsPage; 