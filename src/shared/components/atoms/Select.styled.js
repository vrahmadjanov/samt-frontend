import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #444;
  margin-bottom: 6px;
`;

export const StyledSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  font-size: 14px;
  transition: 0.2s border-color;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    background-color: #fff;
  }
`;
