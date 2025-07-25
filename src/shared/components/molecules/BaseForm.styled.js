import styled from 'styled-components';

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 480px;
  margin: var(--spacing-xl) auto;
  padding: var(--spacing-xl);
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.md};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
