import styled from 'styled-components';

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 480px;
  margin: var(--spacing-xl) auto;
  padding: var(--spacing-xl);
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  /* Эффект приподнятости */
  position: relative;
  
  /* Градиент для объема */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.surfaceGradient};
    border-radius: ${({ theme }) => theme.radius.lg};
    z-index: -1;
  }
`;

export const Title = styled.h2`
  font-size: var(--font-title);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;
