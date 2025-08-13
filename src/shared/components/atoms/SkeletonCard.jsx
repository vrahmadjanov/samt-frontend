import React, { memo } from 'react';
import styled from 'styled-components';
import Skeleton from './Skeleton';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: var(--spacing-lg);
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  box-sizing: border-box;
`;

const TopRow = styled.div`
  display: flex;
  gap: var(--gap-md);
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: var(--gap-sm);
  }
`;

const InfoCol = styled.div`
  flex: 1;
  display: grid;
  gap: 8px;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const AvatarSk = styled(Skeleton)`
  width: ${({ $size }) => ($size === 'lg' ? 120 : 80)}px;
  height: ${({ $size }) => ($size === 'lg' ? 120 : 80)}px;
  border-radius: ${({ $round, theme }) => ($round ? '50%' : theme.radius.md)};
`;

const LineSk = styled(Skeleton)`
  height: ${({ $h }) => ($h ? `${$h}px` : '16px')};
  width: ${({ $w }) => ($w ? ($w === 'full' ? '100%' : `${$w}%`) : '60%')};
`;

const ButtonSk = styled(Skeleton)`
  width: ${({ $w }) => ($w ? `${$w}px` : '140px')};
  height: ${({ $h }) => ($h ? `${$h}px` : '42px')};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const SkeletonCard = memo(({ avatarSize = 'md', avatarRound = false, footerButtons = 2, children }) => (
  <Card>
    <TopRow>
      <AvatarSk $size={avatarSize} $round={avatarRound} />
      <InfoCol>
        {children || (
          <>
            <LineSk $h={22} $w={55} />
            <div style={{ display: 'flex', gap: 8 }}>
              <LineSk $h={20} $w={30} />
              <LineSk $h={20} $w={30} />
            </div>
            <LineSk $w={30} />
            <LineSk $w={65} />
          </>
        )}
      </InfoCol>
    </TopRow>
    <FooterRow>
      {Array.from({ length: footerButtons }).map((_, i) => (
        <ButtonSk key={i} />
      ))}
    </FooterRow>
  </Card>
));

export default SkeletonCard;


