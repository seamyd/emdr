import React from 'react';
import styled from 'styled-components';

const StyledBar = styled.div`
  position: relative;
  width: 100%;
  height: 4rem;
  background-color: lightgray;
  box-shadow: inset 0 0 10px #000000;
  border: 4px solid black;
  border-radius: 2rem;
`;

const Bar: React.FC = ({ children }) => (
  <StyledBar>{children}</StyledBar>
);

export default Bar;
