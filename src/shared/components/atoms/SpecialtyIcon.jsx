import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
`;

const SpecialtyIcon = ({ src, alt }) => <Img src={src} alt={alt} />;

export default SpecialtyIcon; 