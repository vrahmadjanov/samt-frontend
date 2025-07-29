import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../shared/i18n/useTranslation';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--spacing-xl);
  text-align: center;
`;

const MainTitle = styled.h1`
  font-size: var(--font-title);
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-lg);
`;

const MainDescription = styled.p`
  font-size: var(--font-lg);
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 600px;
  line-height: 1.6;
`;

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <MainTitle>{t('main.title', 'Добро пожаловать')}</MainTitle>
      <MainDescription>
        {t('main.description', 'Найдите лучших врачей и медицинские учреждения в вашем регионе')}
      </MainDescription>
    </MainContainer>
  );
};

export default MainPage; 