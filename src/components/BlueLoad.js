import React from 'react';
import { styled } from '@mui/system';

const LoaderContainer = styled('section')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const Dot = styled('div')({
  height: '20px',
  width: '20px',
  marginRight: '10px',
  borderRadius: '10px',
  backgroundColor: '#b3d4fc',
  animation: 'pulse 1.5s infinite ease-in-out',
  '&:last-child': {
    marginRight: '0',
  },
  '&:nth-child(1)': {
    animationDelay: '-0.3s',
  },
  '&:nth-child(2)': {
    animationDelay: '-0.1s',
  },
  '&:nth-child(3)': {
    animationDelay: '0.1s',
  },
});

const Loader = () => (
  <LoaderContainer>
    <Dot />
    <Dot />
    <Dot />
    <Dot />
    <Dot />
  </LoaderContainer>
);

export default Loader;
