import React, { memo } from 'react';
import styled from 'styled-components';
import SectionSkeleton from '../atoms/SectionSkeleton';
import Skeleton from '../atoms/Skeleton';

const HeaderSkGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--spacing-md);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const ImageSk = styled(Skeleton)`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.radius.md};
`;

const NameSk = styled(Skeleton)`
  width: 60%;
  height: 24px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 70%;
    height: 22px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BadgeRowSk = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const BadgeSk = styled(Skeleton)`
  width: 110px;
  height: 20px;
`;

const RatingSk = styled(Skeleton)`
  width: 120px;
  height: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const AddressSk = styled(Skeleton)`
  width: 50%;
  height: 16px;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ActionsRowSk = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const IconBtnSk = styled(Skeleton)`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ClinicHeaderSkeleton = memo(() => (
  <SectionSkeleton>
    <HeaderSkGrid>
      <ImageSk />
      <div style={{ display: 'grid', gap: 8, width: '100%' }}>
        <NameSk />
        <BadgeRowSk>
          <BadgeSk />
          <BadgeSk />
        </BadgeRowSk>
        <RatingSk />
        <AddressSk />
      </div>
    </HeaderSkGrid>
    <ActionsRowSk>
      <IconBtnSk />
      <IconBtnSk />
      <IconBtnSk />
    </ActionsRowSk>
  </SectionSkeleton>
));

export default ClinicHeaderSkeleton;


