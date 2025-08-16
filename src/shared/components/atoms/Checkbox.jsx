import React, { memo } from 'react';
import styled from 'styled-components';
import Label from './Label';
import FormWrapper from './FormWrapper';

const Row = styled.label`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
`;

const Box = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const Checkbox = memo(({ label, ...props }) => (
  <FormWrapper>
    <Row>
      <Box {...props} />
      {label && <Label style={{ margin: 0 }}>{label}</Label>}
    </Row>
  </FormWrapper>
));

export default Checkbox;


