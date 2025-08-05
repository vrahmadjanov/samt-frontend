import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MessageIcon } from '../../assets/icons/Message.svg';

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  
  svg {
    width: 32px;
    height: 32px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MessageIconComponent = () => (
  <IconWrapper>
    <MessageIcon />
  </IconWrapper>
);

export default MessageIconComponent; 