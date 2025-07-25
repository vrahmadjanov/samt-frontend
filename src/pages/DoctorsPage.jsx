import React from 'react';
import { useDoctors } from '../features/doctor/model/useDoctors';
import DoctorList from '../shared/components/organisms/DoctorList';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
`;

const DoctorsPage = () => {
  const { doctors, loading, error } = useDoctors();

  return (
    <Wrapper>
      <h1>Врачи</h1>
      {loading && <div>Загрузка...</div>}
      {error && <div>Ошибка загрузки</div>}
      {!loading && !error && <DoctorList doctors={doctors} />}
    </Wrapper>
  );
};

export default DoctorsPage; 