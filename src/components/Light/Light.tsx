import React from 'react';
import styled, { keyframes } from 'styled-components';

const leftRight = keyframes`
  from {
    left: 0px;
  }

  to {
    left: calc(100% - 4rem);
  }
`;

const StyledLight = styled.div<{duration: number}>`
  position: absolute;
  left: 4px;
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  background-color: #3abe3a; 
  animation: ${leftRight} ${({ duration }) => duration}s linear alternate infinite;
`;

const Light: React.VFC<{duration: number}> = ({ duration }) => (
  <StyledLight duration={duration} />
);

export default Light;
