import React from 'react';
import styled from 'styled-components';
import { useSpecialties } from '../features/main/model/useSpecialties';
import SpecialtyCard from '../shared/components/organisms/SpecialtyCard';

const MainPage = () => {
  const { specialties, loading, error } = useSpecialties();

  return (
    <PageWrapper>
      <Title>Выберите специалиста</Title>
      {loading && <Info>Загрузка...</Info>}
      {error && <Info>Ошибка загрузки специальностей</Info>}
      <Grid>
        {specialties.map((spec) => (
          <SpecialtyCard key={spec.id} name={spec.name} icon={spec.icon} onClick={() => {}} />
        ))}
      </Grid>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Info = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.font.base};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 900px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

export default MainPage; 