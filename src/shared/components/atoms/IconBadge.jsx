import React, { memo } from 'react';
import styled from 'styled-components';

const BadgeWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--font-xs);
  width: fit-content;
`;

const IconBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  svg, img {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

const Label = styled.span`
  line-height: 1;
`;

const IconBadge = memo(({ icon, label, className }) => (
  <BadgeWrap className={className}>
    {icon && <IconBox>{icon}</IconBox>}
    {label && <Label>{label}</Label>}
  </BadgeWrap>
));

export default IconBadge;


