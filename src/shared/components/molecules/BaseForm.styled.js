import styled from 'styled-components';

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 480px;
  margin: 40px auto;
  padding: 32px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  text-align: center;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
