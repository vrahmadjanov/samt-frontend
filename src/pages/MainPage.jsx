import React from 'react';
import styled from 'styled-components';
import { useSpecialties } from '../features/main/model/useSpecialties';
import SpecialtyCard from '../shared/components/organisms/SpecialtyCard';
import AppLayout from '../shared/components/organisms/AppLayout';

const MainPage = () => {
  const { specialties, loading, error } = useSpecialties();

  return (
    <AppLayout>
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
    </AppLayout>
  );
};

const PageWrapper = styled.div`
  width: 100%;
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
  @media (max-width: 600px) {
    font-size: 1.3rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Info = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.font.base};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 900px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    max-width: 100vw;
    gap: ${({ theme }) => theme.spacing.md};
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

export default MainPage; 