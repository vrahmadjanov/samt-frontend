import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const DoctorAvatar = ({ src, alt }) => (
  <Img src={src} alt={alt} loading="lazy" width={64} height={64} />
);

export default DoctorAvatar; 