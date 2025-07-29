import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/useTranslation';

const HeaderSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const PictureWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PicturePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: var(--font-lg);
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: var(--font-xl);
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-sm);
`;

const ProfilePhone = styled.p`
  font-size: var(--font-base);
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: var(--spacing-sm);
`;



const HiddenInput = styled.input`
  display: none;
`;

const ProfileHeader = ({ profile, onUploadPicture, loading }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUploadPicture(file);
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
  };

  const getFullName = () => {
    if (!profile) return t('profile.loading');
    const parts = [];
    if (profile?.first_name) parts.push(profile.first_name);
    if (profile?.last_name) parts.push(profile.last_name);
    if (profile?.middle_name) parts.push(profile.middle_name);
    return parts.length > 0 ? parts.join(' ') : t('profile.noName');
  };

  const getPhoneNumber = () => {
    if (!profile) return t('profile.loading');
    return profile?.phone_number || t('profile.noPhone');
  };

  return (
    <HeaderSection>
      <ProfileContainer>
        <PictureWrapper onClick={handlePictureClick} style={{ cursor: 'pointer' }}>
          {profile?.profile_picture ? (
            <ProfilePicture 
              src={profile.profile_picture} 
              alt={t('profile.profilePicture')}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <PicturePlaceholder style={{ display: profile?.profile_picture ? 'none' : 'flex' }}>
            {getInitials(profile?.first_name, profile?.last_name)}
          </PicturePlaceholder>
        </PictureWrapper>
        
        <ProfileInfo>
          <ProfileName>{getFullName()}</ProfileName>
          <ProfilePhone>{getPhoneNumber()}</ProfilePhone>
        </ProfileInfo>
      </ProfileContainer>
      
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
      />
    </HeaderSection>
  );
};

export default ProfileHeader; 