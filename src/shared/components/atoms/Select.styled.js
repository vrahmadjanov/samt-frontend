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
  padding: 10px 36px 10px 14px; /* справа больше места под стрелку */
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  font-size: 14px;
  transition: 0.2s border-color;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6 8L10 12L14 8" stroke="%234B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px 20px;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    background-color: #fff;
  }
`;
